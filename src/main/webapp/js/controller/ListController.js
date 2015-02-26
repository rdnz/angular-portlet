// Define scope in this way to avoid 'Unknown provider' problem
//      https://groups.google.com/forum/#!msg/angular/_EMeX_Dci2U/xQuDwWadCrsJ
angular.module('app.controllers').
	controller("ListCtrl", ['$scope', '$rootScope', '$http', '$timeout', 'urlFactory', 'bookmarkFactory', '$stateParams',
		function($scope, $rootScope, $http, $timeout, urlFactory, bookmarkFactory, $stateParams) {

			$scope.model = {};

			$scope.remove = function(bookmark) {
				bookmarkFactory.deleteBookmark(bookmark).then(function(result) {
					Liferay.fire('reloadBookmarks', { portletId: $scope.portletId });
					$scope.load();
				});
			};

			$scope.load = function() {
				$timeout(function() {
					bookmarkFactory.getBookmarks().then(function(bookmarks) {
						$scope.model.bookmarks = bookmarks;
					});
				});
			};

			Liferay.on('reloadBookmarks', function(event) {
				// Filter out event if we triggered it in this portlet instance
				if (event.portletId != $scope.portletId) {
					$scope.load();
				}
			});

			$scope.load();
		}
	]
);