'use strict';

angular.module('domain', ['ngResource'])

	.provider('$domain', function(){
		console.log(angular, this);
	})
