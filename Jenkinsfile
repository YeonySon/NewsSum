    pipeline {
        
    agent any
        stages {
                    
            stage('Prepare') {
                steps {
                    sh 'echo "Clonning Repository"'
                    git branch: 'develop',
                        url: 'https://lab.ssafy.com/s09-bigdata-recom-sub2/S09P22B202.git',
                        credentialsId: 'f473f437-e90b-498e-a2fd-c6ccbf464b3a'
                }
                post {
                    success {
                        sh 'echo "Successfully Cloned Repository"'
                    }
                    failure {
                        sh 'echo "Fail Cloned Repository"'
                    }
                }
            }


            // stage('[BE]Bulid Gradle') {
            //     steps {
            //         sh 'echo "Bulid Gradle Start"'
            //         dir('BE') {

            //         }
            //     }
            //     post {
            //          failure {
            //              sh 'echo "Bulid Gradle Fail"'
            //         }
            //     }
            // }	
            stage('Docker stop'){
                steps {
                    dir('BE'){
                        sh 'echo "Docker Container Stop"'


                        sh '''
                        result=$( docker container ls -a --filter "name=newsum*" -q )
                        if [ -n "$result" ]
                        then
                            docker stop $(docker container ls -a --filter "name=newsum*" -q)
                        else
                            echo "No stop containers"
                        fi
                        '''

                        //pwd
        //              도커 컴포즈 다운
                        //sh 'curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose'
        //              해당 도커 컴포즈 다운한 경로로 권한 설정
                        //sh 'sudo chmod -R 777 /usr/local/bin'
                        //sh 'chmod +x /usr/local/bin/docker-compose'
                        //sh 'sudo mv /usr/local/bin/docker-compose /usr/local/bin/ 
        //              기존 백그라운드에 돌아가던 컨테이너 중지
                                            //기존 백그라운드에 돌아가던 컨테이너들을 DooD 방식으로 다운시킴.
                        sh 'docker-compose -f /var/jenkins_home/workspace/pipeline/docker-compose-prod.yml down'
                        //sh '/usr/bin/docker-compose -f docker-compose-prod.yml down'
                    }


                }
                post {
                    failure {
                        sh 'echo "Docker Fail"'
                    }
                }
            }
                    
stage('RM Docker') {
    steps {
        sh 'echo "Remove Docker"'

        // 정지된 도커 컨테이너 찾아서 컨테이너 ID로 삭제함
        sh '''
            result=$( docker container ls -a --filter "name=newsum*" -q )
            if [ -n "$result" ]
            then
                docker rm $(docker container ls -a --filter "name=newsum*" -q)
            else
                echo "No such containers"
            fi
        '''

        // homesketcher로 시작하는 이미지 찾아서 삭제함
        sh '''
            result=$( docker images -f "reference=newsum*" -q )
            if [ -n "$result" ]
            then
                docker rmi -f $(docker images -f "reference=newsum*" -q)
            else
                echo "No such container images"
            fi
        '''

        // 안쓰는이미지 -> <none> 태그 이미지 찾아서 삭제함
        sh '''
            result=$(docker images -f "dangling=true" -q)
            if [ -n "$result" ]
            then
                docker rmi -f $(docker images -f "dangling=true" -q)
            else
                echo "No such container images"
            fi
        '''
    }
    post {
        failure {
            sh 'echo "Remove Fail"'
        }
    }
}

                    
            stage('Set Permissions') {
                        steps {
                            // 스크립트 파일에 실행 권한 추가
                            sh 'chmod +x /var/jenkins_home/workspace/pipeline/start-prod.sh'
                        }
                    }
            stage('Execute start-prod.sh Script') {
                steps {
                    // start-prod.sh 스크립트 실행
                    sh '/var/jenkins_home/workspace/pipeline/start-prod.sh'
                }
            }



    //         stage('[FE] prepare') {
    //             steps {
    //                 dir('frontend'){
    //                     sh 'echo " Frontend Bulid Start"'
    //                     script {
    //                         sh 'docker-compose stop'
    //                         sh 'docker rm vue'
    //                         sh 'docker rmi frontend_vue'
    //                     }
    //                 }


    //             }

    //             post {
    //                 failure {
    //                     sh 'echo "Frontend Build Fail"'
    //                 }
    //             }
    //         }
    //         stage('Fronteend Build & Run') {
    //             steps {
    //                 dir('frontend'){
    //                     sh 'echo " Frontend Build and Start"'
    //                     script {

    // //                          업데이트된 코드로 빌드 및 실행
    //                         sh 'docker-compose up -d'
    //                     }
    //                 }


    //             }

    //             post {
    //                 failure {
    //                     sh 'echo "Bulid Docker Fail"'
    //                 }
    //             }
    //         }
        }
    }
