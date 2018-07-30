myModule.controller("BlogController",function($scope,$http,$rootScope,$location)
		{
			$scope.blog={'blogId':0,'blogName':'','blogContent':'','createDate':'','loginname':'','likes':'','dislikes':'','status':''};
			
			$scope.blogData;
			
			$rootScope.blogCommentData;
			
			$rootScope.blogInfo;
			
			$scope.blogComment={'commentId':0,'blogId':0,'commentText':'','loginname':'','createDate':''};
			
			$scope.addBlog=function()
			{
				$http.post('http://localhost:8057/ChatMiddleware/addBlog',$scope.blog)
				.then(function(response)
				{
					$location.path('/UserHome');
				});
			}
			
			function showBlog()
			{
				$http.get('http://localhost:8057/ChatMiddleware/listBlogs')
				.then(function(response)
				{
					$scope.blogData=response.data;
					console.log($scope.blogData);
					
				});
			}
			
			$scope.approve=function(blogId)
			{
				$http.get('http://localhost:8057/ChatMiddleware/approveBlog/'+blogId)
				.then(function(response)
				{
					console.log('Approving the Blog');
				});
			}
			
			$scope.reject=function(blogId)
			{
				$http.get('http://localhost:8057/ChatMiddleware/rejectBlog/'+blogId)
				.then(function(response)
				{
					console.log('Rejecting the Blog');
				});
			}
			
			$scope.incLike=function(blogId)
			{
				$http.get('http://localhost:8057/ChatMiddleware/incrementLikes/'+blogId)
				.then(function(response)
				{
					console.log('Incrementing the likes in the Blog');
				});
			}
			
			$scope.incDisLike=function(blogId)
			{
				$http.get('http://localhost:8057/ChatMiddleware/incrementDisLikes/'-blogId)
				.then(function(response)
				{
					console.log('Incrementing the Dislikes in the Blog');
				});
			}
			
			$rootScope.comment=function(blog)
			{
				console.log('I am in Comment Controller');
				$http.get('http://localhost:8057/ChatMiddleware/getAllComment/'+blog.blogId)
				.then(function(response)
				{
					$rootScope.blogInfo=blog;
					console.log($rootScope.blogInfo);
					$rootScope.blogCommentData=response.data;
					$location.path('/blogComment');	
				});
				
			}
			
			$scope.insertComment=function()
			{
				console.log('Inserting Comment');
				$scope.blogComment.loginname=$rootScope.currentUser.loginname;
				$scope.blogComment.blogId=$rootScope.blogInfo.blogId;
				$http.post('http://localhost:8057/ChatMiddleware/insertComment',$scope.blogComment)
				.then(function(response)
				{
					console.log('Successful');
					$location.path('/blogComment');	
				});
			}
			showBlog();
		
		});