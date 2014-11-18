'use strict';


angular.module('domain', ['ngResource'])

	.service('$marshaller', function($parse){
		
		var config = {
			key: '$$marshallers',
			method: '$marshal'
		}

		var Marshaller = function(){

			var $marshaller = this;

			this.bind = function(Domain, rules){

				var parsedRules = this.parse(rules)

				Domain.prototype[config.key] = parsedRules
				Domain.prototype[config.method] = function(){
					return $marshaller.marshal(this, parsedRules)
				}

			}

			this.parse = function(settings){
				var out = {}

				angular.forEach(settings, function(rules, key){
					rules = '$prop | ' + rules;

					out[key] = $parse(rules);
				})

				return out;
			}


			this.marshal = function(domain, rules){
				// Make shallow copy to avoid overriding
				var out = angular.extend({}, domain)

				angular.forEach(rules, function(filter, key){
					var context = {
						$prop: out[key],
						$obj: domain
					}

					// Apply compiled rules to context
					out[key] = filter(context)
				})

				return out;
			}
		}


		return new Marshaller()
	})

