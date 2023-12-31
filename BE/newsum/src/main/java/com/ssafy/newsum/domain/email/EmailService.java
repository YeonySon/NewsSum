package com.ssafy.newsum.domain.email;

import java.util.Random;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
@PropertySource("classpath:application.yml")
public class EmailService {
	private final JavaMailSender emailSender;
	public static final String ePw = createKey();

	@Value("${AdminMail.id}")
	private String id;

	private MimeMessage createMessage(String to) throws Exception {
		log.info("보내는 대상 : {}", to);
		log.info("인증 번호 : {}", ePw);
		MimeMessage message = emailSender.createMimeMessage();

		message.addRecipients(Message.RecipientType.TO, to);
		message.setSubject("이메일 인증 테스트");

		String msgg = "";
		msgg += "<div style='margin:20px;'>";
		msgg += "<h2> 안녕하세요 NewSum입니다. </h2>";
		msgg += "<br>";
		msgg += "<p>아래 코드를 복사해 입력해주세요<p>";
		msgg += "<br>";
		msgg += "<p>감사합니다.<p>";
		msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
		msgg += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
		msgg += "<div style='font-size:130%'>";
		msgg += "CODE : <strong>";
		msgg += ePw + "</strong><div><br/> ";
		msgg += "</div>";
		message.setText(msgg, "utf-8", "html");//내용
		message.setFrom(new InternetAddress(id, "newsum_admin"));//보내는 사람

		return message;
	}

	public static String createKey() {
		StringBuffer key = new StringBuffer();
		Random rnd = new Random();

		for (int i = 0; i < 8; i++) { // 인증코드 8자리
			int index = rnd.nextInt(3); // 0~2 까지 랜덤

			switch (index) {
				case 0:
					key.append((char)((int)(rnd.nextInt(26)) + 97));
					//  a~z  (ex. 1+97=98 => (char)98 = 'b')
					break;
				case 1:
					key.append((char)((int)(rnd.nextInt(26)) + 65));
					//  A~Z
					break;
				case 2:
					key.append((rnd.nextInt(10)));
					// 0~9
					break;
			}
		}
		return key.toString();
	}

	public String sendSimpleMessage(String to) throws Exception {
		log.info("to: {}", to);
		MimeMessage message = createMessage(to);
		try {//예외처리
			emailSender.send(message);
		} catch (MailException es) {
			es.printStackTrace();
			throw new IllegalArgumentException();
		}
		return ePw;
	}
}
