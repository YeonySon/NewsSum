package com.ssafy.newsum.domain.news.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NewsResponseDto {

    private Integer id;
    private String head;
    private String main;
    private String threeLine;
    private String url;
    private String postedDate;
    private String mediaName;
    private String mediaImage;
    private String image;
    private String cgName;
    private Integer viewCnt;
    private Integer likeCnt;
    private Integer scrapCnt;
    private String isScrap;
    private String isLike;
    private Integer totalPages;


}
