'use strict';


angular.module('domain')

	.provider('$domainValidator', function(){

		var provider = this;
		
		provider.config = {
			key: '$constraints',
			method: '$validate',
			errors: '$errors',
			propertyRef: '$prop',
			domainRef: '$domain',
			separator: '|'
		}

		provider.Constraint = function Constraint(rule){
			// Remove parameters from rule
			this.rule = rule.split(':')[0]

			this.callback
		}


		provider.ValidationError = function ValidationError(constraint, context){
			this.rule = constraint.rule
			this.value = context[provider.config.propertyRef]
		}

		var Validator = function Validator($parse){

			var $validator = this;

			this.parse = function(settings){
				var out = {};

				angular.forEach(settings, function(rules, key){
					// Array to hold constraints
					out[key] = []

					angular.forEach(rules.split(provider.config.separator), function(rule){
						var constraint = new provider.Constraint(rule),
							callback = provider.config.propertyRef + ' ' +  provider.config.separator + ' ' + rule

						try{
							constraint.callback = $parse(callback)
						}
						catch(e){
							throw new Error(
								'[' + callback + ']' + ' using [' + rule + '] cannot be parsed. ' +
								'Are you sure [' + constraint.rule + '] filter exists?'
							)
						}


						out[key].push(constraint)
					})
				})

				return out;
			}


			this.validate = function(domain, constraints){

				var errors = {}

				angular.forEach(constraints, function(constraint, key){
					var context = {
						$prop: domain[key],
						$obj: domain
					}

					angular.forEach(constraint, function(c){
						if(errors[key]) return

						if(! c.callback(context))
							errors[key] = new provider.ValidationError(c, context)
					})
				})

				domain[provider.config.errors] = errors

				// zero errors means domain is valid
				return angular.equals({}, errors) ? true : false
			}
			
		}

		// Validator Factory
		this.$get = ['$parse', function($parse){
			return new Validator($parse);
		}]
	})

