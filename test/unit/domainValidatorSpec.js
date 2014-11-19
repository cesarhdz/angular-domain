'use strict';

describe('$domainValidator Service', function(){
  
  var 
  service,
  domain,
  result,
  constraints = {},
  Domain = function(){
    this.name
    this.age
  }

  beforeEach(module('domain'))

  beforeEach(inject(function($domainValidator){
    service = $domainValidator
  }))

  beforeEach(function(){
    domain = new Domain()
  })

  it('Should parse constraints', function(){
    // given
    constraints.name = 'isString|maxLength:36'

    // when
    result = service.parse(constraints)

    //then rules are parsed
    expect(result.name).toEqual(jasmine.any(Array))
    expect(result.name.length).toBe(2)

    // and constraints preserves rule name, to create message
    expect(result.name[0].rule).toBe('isString')
    expect(result.name[1].rule).toBe('maxLength')

    // and constraints have a callback, that the propety must pass
    expect(result.name[0].callback).toEqual(jasmine.any(Function))
    expect(result.name[1].callback).toEqual(jasmine.any(Function))


  })


});

