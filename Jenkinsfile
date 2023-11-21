pipeline {
  agent any
  tools {
    node: 'node20'
    sonar: 'sonar-scanner'
  }
  /*environment {
    NODEJS_HOME = tool name: 'node20'
    scannerHome = tool name: 'sonar-scanner'
    PATH="${NODEJS_HOME}/bin:${scannerHome}/bin/sonar-scanner:${env.PATH}"
  }*/
  stages {
    stage('Check tools versions') {
      steps {
        sh "echo ${PATH}"
        sh 'sonar-scanner --version'
        sh 'node --version'
      }
    }
    stage('Scan') {
      steps {
        withSonarQubeEnv(installationName: 'mySonar') { 
          sh '${scannerHome}/bin/sonar-scanner'
        }
      }
    }
    stage('Wait for quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }  
      }
    }
  }
}