

# -*- coding: utf-8 -*-
"""
Created on Fri Sep  8 17:23:17 2023

@author: SSAFY

https://n.news.naver.com/mnews/article/092
5
https://n.news.naver.com/mnews/article/092/0002304430?sid=105
https://n.news.naver.com/mnews/article/011/0004234096?sid=105
https://n.news.naver.com/mnews/article/014/0005067021?sid=105 -파이
https://n.news.naver.com/mnews/article/001/0014169992?sid=105 -연합
https://n.news.naver.com/mnews/article/001/0014169937?sid=105

모바일 731
https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2=731&sid1=105&date=20230908&page=3 
인터넷/sns 226
https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2=226&sid1=105&date=20230908&page=2
통신/뉴미디어 227
https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2=227&sid1=105&date=20230908&page=3
it 일반 230
https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2=230&sid1=105&date=20230908&page=7
보안/ 해킹 732
https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid1=105&sid2=732
컴퓨터  283
https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2=283&sid1=105&date=20230908&page=2
게임/리뷰 229
https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2=229&sid1=105&date=20230908&page=3


"""

import requests
from bs4 import BeautifulSoup
import datetime



#define
now = datetime.datetime.now()
date = str(now.strftime('%Y%m%d')) #그날날자 뉴스 가져오기
date = '20230910' #특정한 날자의 뉴스 가져오기
MaxNum = '100'; #최대 pg
path = "C://Users/SSAFY/Desktop/news/" #저장할 파일 - 마지막에 / 필수



categorys = [['보안,해킹', '732',[]],
             ['모바일','731',[]],
             ['인터넷,sns', '226',[]],
             ['통신,뉴미디어','227',[]],
             ['컴퓨터', '283',[]],
             ['게임,리뷰', '229',[]],
             ['it 일반', '230',[]]
             ]



# 중복된 링크를 저장할 빈 리스트
duplicate_links = []
#url = 'https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2='+categorys[0][1]+'&sid1=105&date='+date+'&page='+num
ct = 0;

for category in categorys:
    #분야별 페이지 마지막으로 이동
    url = 'https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2='+category[1]+'&sid1=105&date='+date+'&page='+MaxNum
    #print("url : " + url)
    response = requests.get(url, headers={'User-Agent':'Mozilla/5.0'})
    #응답 있음
    
    if response.status_code == 200:
        #문서 크롤링
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        
        #페이지 장수 확인
        page = soup.select_one('div.paging > strong')

        #기사 컴포넌트 추출
        header = soup.select('ul.type06_headline > li > dl > dt.photo > a')
        #링크만 뽑아서 저장
        for a in header:
            category[2].append([a['href']])
            
        
        strSoup = str(soup);

        #장수만큼 다시 크롤링
        for no in range(1, int(page.text)):
            #분야별 페이지
            url = 'https://news.naver.com/main/list.naver?mode=LS2D&mid=shm&sid2='+category[1]+'&sid1=105&date='+date+'&page='+str(no)
            #print("url : " + url)
            response = requests.get(url, headers={'User-Agent':'Mozilla/5.0'})
            #응답 있음
            
            if response.status_code == 200:
                #문서 크롤링
                html = response.text
                soup = BeautifulSoup(html, 'html.parser')
                
                #기사 컴포넌트 추출
                header = soup.select('ul.type06_headline > li > dl > dt.photo > a')
                #링크만 뽑아서 저장
                for a in header:
                    category[2].append([a['href']])

                
                

            else : 
                print(response.status_code)

        #기사 페이지 크롤링
        
        for i in range(len(category[2])):
            
            pageUrl = category[2][i][0]
            
            response = requests.get(pageUrl)
            strSoup = ""
            if response.status_code == 200:
                html = response.text
                soup = BeautifulSoup(html, 'html.parser')
                #print(soup)
                strSoup = str(soup);
                
                title = soup.select_one('h2#title_area')
                time = soup.select_one('span._ARTICLE_DATE_TIME')
                media = soup.select_one('a.media_end_head_top_logo > img')
                media_name = media['title']
                media_img = media['src']
                media_id = pageUrl.split("/")[-2]
                text = soup.select_one('article')
                img = soup.select_one('article img')
                if (img != None):
                    img_src = img['data-src']
                    #print(img_src)
                    if(img == None):
                        img_src = img['src']
                else:
                    img_src = None

                category[2][i].append(title.get_text())
                category[2][i].append(time.get_text())
                category[2][i].append(media_id)
                category[2][i].append(media_name)
                category[2][i].append(media_img)
                category[2][i].append(text.get_text())
                category[2][i].append(img_src)

            else : 
                print(response.status_code)

        

    else : 
        print(response.status_code)
        
        
print(categorys)




