'use strict';


angular.module('domain')

	.service('$domainValidator', function($parse){
		
		var config = {
			key: '$constraints',
			method: '$validate',
			errors: '$errors',
			propertyRef: '$prop',
			domainRef: '$domain',
			separator: '|'
		},

		Constraint = function Constraint(rule){
			// Remove parameters from rule
			this.rule = rule.split(':')[0]

			this.callback
		},

		Validator = function(){

			var $validator = this;

			this.parse = function(settings){
				var out = {};

				angular.forEach(settings, function(rules, key){
					// Array to hold constraints
					out[key] = []

					angular.forEach(rules.split(config.separator), function(rule){
						var constraint = new Constraint(rule)

						try{
							constraint.callback = $parse(config.propertyRef + ' ' +  config.separator + ' ' + rule)
						}
						catch(e){
							throw new Error(
								'[' + rule + '] cannot be parsed. ' +
								'Are you sure [' + constraint.rule + '] filter exists?'
							)
						}


						out[key].push(constraint)
					})
				})

				return out;
			}
		}


		return new Validator()
	})

