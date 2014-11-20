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


		ValidationError = function ValidationError(constraint, context){
			this.rule = constraint.rule
			this.value = context[config.propertyRef]
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
							errors[key] = new ValidationError(c, context)
					})
				})

				domain[config.errors] = errors

				// zero errors means domain is valid
				return angular.equals({}, errors) ? true : false
			}
			
		}


		return new Validator()
	})

