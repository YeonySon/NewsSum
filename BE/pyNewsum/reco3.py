import pandas as pd
from rank_bm25 import BM25Okapi

import numpy as np
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
from sklearn.metrics.pairwise import cosine_similarity
import mysql.connector
from konlpy.tag import Okt
from collections import Counter

okt = Okt()
import re

def make_doc2vec_models(tagged_data, tok, vector_size=128, window=3, epochs=40, min_count=0, workers=4):
    model = Doc2Vec(tagged_data, vector_size=vector_size, window=window, epochs=epochs, min_count=min_count,
                    workers=workers)
    model.save(f'./{tok}_news_model.doc2vec')


def get_data(preprocess=True):
    data = news_df.copy()
    for i in range(len(data['nouns'])):
        nouns_split = ""
        for j in range(len(data['nouns'][i])):
            nouns_split += data['nouns'][i][j]
            nouns_split += " "
        # print(test['nouns'][i][j])
        nouns_split.rstrip()
        data['nouns'][i] = nouns_split
    return data


def get_preprocessing_data(data):
    data['title_article'] = data['head'] + " " + data['main']
    data.drop(['head', 'main'], axis=1, inplace=True)
    return data


def make_doc2vec_data(data, column, t_document=False):
    data_doc = []
    for tag, doc in zip(data.index, data[column]):
        doc = doc.split(" ")
        data_doc.append(([tag], doc))
    if t_document:
        data = [TaggedDocument(words=text, tags=tag) for tag, text in data_doc]
        return data
    else:
        return data_doc


def get_recommened_contents(user, data_doc, model):
    scores = []

    for tags, text in data_doc:
        trained_doc_vec = model.dv[tags[0]]
        scores.append(cosine_similarity(user.reshape(-1, 128), trained_doc_vec.reshape(-1, 128)))

    scores = np.array(scores).reshape(-1)
    scores = np.argsort(-scores)[:55]

    return data.loc[scores, :]


def make_user_embedding(index_list, data_doc, model):
    user = []
    user_embedding = []
    for i in index_list:
        user.append(data_doc[i][0][0])
    for i in user:
        user_embedding.append(model.dv[i])
    user_embedding = np.array(user_embedding)
    user = np.mean(user_embedding, axis=0)
    return user


def view_user_history(data):
    print(data[['cg_id', 'title_article']])


# mysql 연결
db_config = {
    "host": "j9b202.p.ssafy.io",
    "user": "newsum",
    "password": "k3s2b202ssafy",
    "database": "newssumdb2",
    "port": 3350
}

conn = mysql.connector.connect(**db_config)

# 커서 생성
cursor = conn.cursor()

# SQL 쿼리 정의
sql_query = "SELECT * FROM news"

# SQL 쿼리 실행 및 결과를 Pandas DataFrame으로 가져오기
news_df = pd.read_sql(sql_query, conn)

newsList = []
for i in range(len(news_df['main'])):
    newsList.append(news_df['main'][i])
# news_df
tokenized_corpus = [doc for doc in news_df['nouns']]
# print(tokenized_corpus)
bm25 = BM25Okapi(tokenized_corpus)

# query = "최은수 인텔리빅스 대표“비전 인공지능(AI) 기술은 재난·재해, 안전사고로부터 국민의 생명과 재산을 지키고 생각하지도 못한 다양한 분야에서 활용할 수 있습니다. 비전AI로 세상을 더 이롭게 하겠습니다.”최은수 인텔리빅스 대표는 회사 비전과 포부에 대해 이같이 밝혔다.지난달 취임한 최 대표는 국내 1호 데이터거래소인 KDX 한국데이터거래소 창업자이자 서울과학종합대학원대학교 AI석학교수로 비즈니스 모델 설계 전문가다. 1993년 매일경제신문 경제경영 전문기자를 시작으로 종합편성채널 MBN에서 보도국장, 보도본부장 등을 역임했다.MBN 보도본부장을 끝으로 인생 2라운드를 맞이한 최 대표는 영입 제안이 들어온 여러 회사를 마다하고 인텔리빅스를 선택했다. 비전AI 기술로 안전을 지키는 인텔리빅스 비즈니스가 최 대표가 가진 전문성, 언론인으로서 추구해온 공익적 가치 양쪽 모두와 맞아떨어졌기 때문이다.인텔리빅스는 생활안전부터 제조·건설·재난안전은 물론 군중 안전관리 등 곳곳에서 국민 안전을 책임지는 솔루션을 보유했다. 나아가 교통분석과 차량번호판 인식 솔루션, 자동출입국 심사대 솔루션, 매장 고객 분석 데이터를 제공하는 스마트 리테일 솔루션 등을 통해 다양한 분야에서 활약한다.최 대표는 “오산시에 공급한 AI 폐쇄회로(CC)TV는 비틀거리며 걷던 사람이 차량에 탑승해 운전하자 경찰에 신고했고, 출동한 경찰이 음주운전자를 잡아냈다”면서 “모자나 마스크를 쓰고 통화하면서 현금을 찾는 보이스피싱범의 행동패턴을 분석해 금융거래 전 주의 문구를 안내하는 예방 솔루션으로, 금융사기 신고 접수 건수를 약 67% 줄이는 성과도 냈다”고 말했다.최 대표는 서울시 관악구 등산로 성폭행 살인사건 등을 예로 들며 방범용 CCTV가 아닌 AI CCTV를 설치했다면 피해를 예방할 수 있었다고 안타까움을 표했다. 또 사회적 약자를 위한 엘리베이터 자동 호출 솔루션이 일본에선 활성화하고 있지만 정작 한국에서 도입이 더딘 데 대해 아쉬움을 토로했다.최 대표는"
# tokenized_query = tokenizer(query)

# user_query = "SELECT usr_id,content_id FROM read_news group by usr_id, content_id limit 0,1000000"
user_query = "SELECT r.usr_id, GROUP_CONCAT( n.nouns SEPARATOR '') AS sum_list  FROM read_news r join news n on r.content_id = n.id GROUP BY r.usr_id"
user_df = pd.read_sql(user_query, conn)

print(user_df)
# print( user_df['sum_list'][0])
# tokenized_query = news_df['nouns'][4]+ news_df['nouns'][5] + news_df['nouns'][8] + news_df['nouns'][10]

# 여기서부터 for문 usrId 별로 돌아야 함
# total_list = [len(user_df['usr_id'])][]
# total_list = [[0 for j in range(len(user_df['usr_id']))] for i in range(100)]

reco_list = []
doc_list = []
total_list = []
for idx in range(len(user_df['usr_id'])):

    reco_list = []
    total_list = []

    query = "select content_id from read_news where usr_id = %s"
    data = (int(user_df['usr_id'][idx]),)
    cursor.execute(query, data)

    userId_list = cursor.fetchall()
    if userId_list:
        userId_list = [item[0] for item in userId_list]
    #     print(userId_list)

    tokenized_query = user_df['sum_list'][idx]

    # print(tokenized_query)
    doc_scores = bm25.get_scores(tokenized_query)
    # doc_scores

    reco = []

    reco = bm25.get_top_n(tokenized_query, newsList, n=55)

    k = 1
    for i in range(len(reco)):
        for j in range(len(news_df['main'])):
            if (news_df['main'][j] == reco[i]):
                #                 if news_df['id'][j] not in userId_list:
                if (k >= 6):
                    reco_list.append(news_df['id'][j])
                k += 1
    #                     query = "INSERT INTO recommend_news (news_id, usr_id) VALUES (%s,%s)"
    #                     data = (int(news_df['id'][j]),int(user_df['usr_id'][idx]))
    #                     print("SQL Query:", query % data)
    #                     cursor.execute(query, data)
    #                     conn.commit()

    print("===========")
    print(reco_list)
    print("===========")

    #     //////////////////////////////
    # SQL 쿼리 정의
    sql_query = "SELECT * FROM news"

    # SQL 쿼리 실행 및 결과를 Pandas DataFrame으로 가져오기
    data = pd.read_sql(sql_query, conn)

    get_preprocessing_data(data)

    data_doc_title_content_tag = make_doc2vec_data(data, 'title_article', t_document=True)
    data_doc_title_content = make_doc2vec_data(data, 'title_article')
    data_doc_tok_tag = make_doc2vec_data(data, 'nouns', t_document=True)
    data_doc_tok = make_doc2vec_data(data, 'nouns')

    make_doc2vec_models(data_doc_title_content_tag, tok=False)
    make_doc2vec_models(data_doc_tok_tag, tok=True)

    model_title_content = Doc2Vec.load('./False_news_model.doc2vec')
    model_tok = Doc2Vec.load('./True_news_model.doc2vec')

    # data.loc[data.id==56,:]
    # user_query = "SELECT usr_id,content_id FROM read_news group by usr_id, content_id limit 0,1000000"
    # user_df = pd.read_sql(user_query, conn)
    # user_df

    # SQL 쿼리 실행
    sql_query = "SELECT usr_id, content_id FROM read_news GROUP BY usr_id, content_id LIMIT 0, 1000000"
    cursor.execute(sql_query)

    # 결과 가져오기
    result = cursor.fetchall()

    # usr_id 별로 content_id를 모아서 딕셔너리로 저장
    usr_content_dict = {}
    for row in result:
        usr_id, content_id = row
        if usr_id not in usr_content_dict:
            usr_content_dict[usr_id] = []
        usr_content_dict[usr_id].append(content_id)

    # MySQL 연결 종료
    # cursor.close()
    # conn.close()

    # usr_id 별로 content_id 리스트 출력
    for usr_id, content_ids in usr_content_dict.items():

        doc_list = []
        print(f"usr_id:{usr_id}, content_ids: {content_ids}")
        #     globals()['user_category_{}'.format(usr_id)] = pd.DataFrame()
        DF = pd.DataFrame(columns=['id', 'three_line', 'url', 'posted_date', 'media_id', 'image', 'cg_id', 'total_like',
                                   'total_scrap', 'view_cnt', 'nouns', 'title_article'])
        for i in range(len(content_ids)):
            #         print(content_ids[i])
            #         print(data.loc[data.id==i,:])
            DF = pd.concat([DF, data.loc[data.id == content_ids[i], :]], ignore_index=True)
        #     DF
        user = make_user_embedding(DF.index.values.tolist(), data_doc_tok, model_tok)
        result = get_recommened_contents(user, data_doc_tok, model_tok)
        #     print(result)
        for id in range(len(result['id'])):
            #         print(result['id'].iloc[id])
            if (id > 4):
                #             print(result['id'][id])
                doc_list.append(result['id'].iloc[id])
        print(doc_list)
        N = 0
        M = 0
        if (user_df['usr_id'][idx] == usr_id):
            for num in range(len(reco_list) + len(doc_list)):
                # 짝수면 bm25 넣기
                if (num % 2 == 0):
                    total_list.append(reco_list[N])
                    N += 1
                else:
                    total_list.append(doc_list[M])
                    M += 1

        #     print(pd.DataFrame(result.loc[:, ['cg_id', 'title_article']]))
        # user_category_1
    #     length=len(total_list)
    #     for index in range(length):
    #         if total_list[index] in userId_list:

    #             print("////////////////////////////")
    #             print(length)

    #             print(total_list[index])
    #             total_list.remove(total_list[index])
    #             print("////////////////////////////ㅇㅇㅇㅇㅇ")
    #             print(index)
    #             length-=1
    #             index-=1

    length = len(total_list)
    index = length - 1  # 역방향으로 시작

    while index >= 0:
        if total_list[index] in userId_list:
            total_list.pop(index)
        index -= 1

    print("totalList-------------------------------------------")
    print(user_df['usr_id'][idx])
    print(total_list)
    print(len(total_list))

    for IDX in range(len(total_list)):
        query = "INSERT INTO recommend_news (news_id, usr_id) VALUES (%s,%s)"
        data = (int(total_list[IDX]), int(user_df['usr_id'][idx]))
        print("SQL Query:", query % data)
        cursor.execute(query, data)
        conn.commit()

# 데이터베이스 연결 종료
cursor.close()
conn.close()
