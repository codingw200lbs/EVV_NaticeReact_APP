

test('User input and result test', () => {

    
    input = '123456'
    
    onChangeText= input
    text = input
    defaultValue = text
    expect(onChangeText).toMatch(input);
  });

  
  //Test sample:
  test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
  });
  
  test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
  });
  test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });
  test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
  });
  