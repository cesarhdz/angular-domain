'use strict';

describe('$marshaller Service', function(){
  
  var 
  service,
  domain,
  result,
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

  xit('Should use registered marshallers', function(){
    // given
  })


  it('Should marshal declared properties', function(){
    // where
    var settings = { name: 'lowercase' }

    // given
    // lowercase filter is registered
    
    // and
    domain.name = 'MixedCaseName'

    // when
    result = service.marshal(domain, settings)

    // then
    expect(result.name).toBe('mixedcasename')
  })

  xit('Should allow partial marshalling', function(){
    // pending()
  })
});

