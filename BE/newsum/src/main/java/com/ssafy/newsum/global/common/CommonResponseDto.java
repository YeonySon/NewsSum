package com.ssafy.newsum.global.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommonResponseDto<T> {

    private int statusCode;
    private String message;
    private T data;

    public static <T> CommonResponseDto<T> success(int statusCode, String message, T data) {
        return CommonResponseDto.<T>builder()
                .statusCode(statusCode)
                .message(message)
                .data(data)
                .build();
    }

    public static <T> CommonResponseDto<T> error(int statusCode, String message) {
        return CommonResponseDto.<T>builder()
                .statusCode(statusCode)
                .message(message)
                .build();
    }

}
