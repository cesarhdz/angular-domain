'use strict';

describe('$marshaller Service', function(){
  
  var 
  service,
  domain,
  result,
  rules = {
    name: 'uppercase|json',
    age: 'number',
    birthday: 'date'
  },
  Domain = function(){
    this.name
    this.age
  }

  beforeEach(module('domain'))

  beforeEach(inject(function($marshaller){
    service = $marshaller
  }))

  beforeEach(function(){
    domain = new Domain()
  })

  it('Should parse settings', function(){
    // when
    result = service.parse(rules)

    // then
    expect(result.name).toEqual(jasmine.any(Function))
    expect(result.age).toEqual(jasmine.any(Function))
    expect(result.birthday).toEqual(jasmine.any(Function))
  })

  it('Should protoype $marshal method to domain', function(){
    // when
    service.bind(Domain, rules)

    // and
    domain = new Domain()

    // then
    expect(domain.$$marshallers.name).toEqual(jasmine.any(Function))
    expect(domain.$$marshallers.age).toEqual(jasmine.any(Function))
    expect(domain.$$marshallers.birthday).toEqual(jasmine.any(Function))
  })

  it('Should apply rules to marshal object', function(){
    // where
    var settings = { name: function(context){ 
      return '"mixedcasename"'
    }}

    // and
    domain.name = 'MixedCaseName'

    // when
    result = service.marshal(domain, settings)

    // then
    expect(result.name).toBe('"mixedcasename"')
  })

});

