import { UnicodePipe } from './unicode.pipe';

describe('UnicodePipe', () => {
  it('should convert text with unicode substrings', () => {
    const given = 'a &#x2F; ab &#x2F; abc &#x2F; abcd';
    const expected = 'a / ab / abc / abcd';

    const pipe = new UnicodePipe();
    expect(pipe.transform(given)).toEqual(expected);
  });
});
