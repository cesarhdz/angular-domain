'use strict';


angular.module('domain', ['ngResource'])

	.service('$marshaller', function($injector){


		console.log('domain module')
		
		var Marshaller = function(){

			this.marshal = function(domain, settings){
				// Make shallow copy
				var out = angular.extend({}, domain)

				angular.forEach(settings, function(rules, key){
					// Load Filter
					var filter = $injector.get(rules + 'Filter')

					// Apply filter
					out[key] = filter(out[key])
				})

				return out;
			}
		}


		return new Marshaller()
	})

