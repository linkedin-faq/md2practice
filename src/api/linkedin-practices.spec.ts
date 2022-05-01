import { readFileSync } from 'fs';
import { resolve } from 'path';
import { fetchLinkedInPracticeInfos, getLinkedInPracticeInfos } from './linkedin-practices';

describe('LinkedIn Practices API', () => {
  const mockedData = readFileSync(resolve(__dirname, './__mocks__/correct-menu.md'), 'utf-8');

  it('should be able get a link of LinkedIn info', () => {
    const data = getLinkedInPracticeInfos(mockedData, 'https://www.base.com');
    expect(data).toHaveLength(3);
    expect(data[0]).toMatchInlineSnapshot(`
    Object {
      "title": "Accounting",
      "url": "https://www.base.com/accounting/accounting-quiz.md",
    }
    `);
    expect(data[1]).toMatchInlineSnapshot(`
    Object {
      "title": "Adobe-Acrobat",
      "url": "https://www.base-2.com/adobe-acrobat/adobe-acrobat-quiz.md",
    }
    `);
  });

  it('should throw error if no LinkedIn table data found', () => {
    const mockedWrongData = readFileSync(resolve(__dirname, './__mocks__/wrong-menu.md'), 'utf-8');
    expect(() => getLinkedInPracticeInfos(mockedWrongData, 'https://www.base.com')).toThrowError(new Error('No LinkedIn Data Found.'));
  });

  // Not unit test, fetch directly from remote source, check whether got update.
  it('should be able fetch from LinkedIn info from repository', async () => {
    const data = await fetchLinkedInPracticeInfos();
    expect(data.length).toBeGreaterThan(70);
  });
});
