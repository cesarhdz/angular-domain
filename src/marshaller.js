'use strict';


angular.module('domain', ['ngResource'])

	.service('$marshaller', function($parse){
		
		var Marshaller = function(){

			this.parse = function(settings){
				var out = {}

				angular.forEach(settings, function(rules, key){
					rules = '$prop | ' + rules;

					out[key] = $parse(rules);
				})

				return out;
			}


			this.marshal = function(domain, settings){
				// Make shallow copy to avoid overriding
				var out = angular.extend({}, domain)

				angular.forEach(settings, function(rules, key){
					// Add $prop variable as the target of the filter
					rules = '$prop | ' + rules;

					// Compile rules
					var getter = $parse(rules);

					var context = {
						$prop: out[key],
						$obj: domain
					}

					// Apply compiled rules to context
					out[key] = getter(context)
				})

				return out;
			}
		}


		return new Marshaller()
	})

