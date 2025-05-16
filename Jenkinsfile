node('server_build_slave') {

try {

   stage('Checkout'){

      checkout scm
   }
	stage('docker-build') {
	      
		   sh '''
		   commit_id=$(git rev-parse --short HEAD)
		   echo $commit_id> commit_id.txt

		   pwd
         cd frontend
		   docker build -t docker.idc.tarento.com/$docker_repo:$commit_id .
		   '''
		  archiveArtifacts 'commit_id.txt'

		   	
      }
      stage('Docker push') 
	  withCredentials([string(credentialsId: 'docker_registry', variable: 'registry_pass')]){
	   
	      sh '''
		     pwd
		    commit_id=$(git rev-parse --short HEAD)
		    echo $registry_pass > registry_pass.txt
			docker login -u dockeradmin -p "$(cat registry_pass.txt)" docker.idc.tarento.com
			docker push docker.idc.tarento.com/$docker_repo:$commit_id
			rm -rf registry_pass.txt
			docker rmi -f docker.idc.tarento.com/$docker_repo:$commit_id  


                
		     '''
		   }


}

catch (err) {
    currentBuild.result = "FAILURE"
    throw err
 }

}
