pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_BACKEND = "tanujnimkar/portfolio-backend"
        IMAGE_FRONTEND = "tanujnimkar/portfolio-frontend"
        EC2_HOST = "ec2-user@your-ec2-ip"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/TanUjNimkar/portfolio.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $IMAGE_BACKEND:$BUILD_NUMBER .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $IMAGE_FRONTEND:$BUILD_NUMBER .'
                }
            }
        }

        stage('Trivy Scan') {
            steps {
                sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL $IMAGE_BACKEND:$BUILD_NUMBER'
                sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL $IMAGE_FRONTEND:$BUILD_NUMBER'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKER_HUB_CREDENTIALS_PSW | docker login -u $DOCKER_HUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push $IMAGE_BACKEND:$BUILD_NUMBER'
                sh 'docker push $IMAGE_FRONTEND:$BUILD_NUMBER'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no $EC2_HOST '
                          cd /home/ec2-user/portfolio &&
                          docker compose pull &&
                          docker compose up -d --remove-orphans
                        '
                    """
                }
            }
        }
    }

    post {
        success { echo '✅ Deployment successful!' }
        failure { echo '❌ Deployment failed. Check logs.' }
    }
}