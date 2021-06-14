const { getCache, cache } = require('../cache');

const data = [
  [
    {
      rank: '1.',
      title: 'Doom Running on an IKEA Lamp [video]',
      url: 'https://www.youtube.com/watch?v=7ybybf4tJWw',
      author: 'kregasaurusrex',
      score: '391 points',
      date: '5 hours ago',
      comments: '89 comments',
    },
    {
      rank: '2.',
      title: "'Positive deviants': Why rebellious workers spark great ideas",
      url: 'https://www.bbc.com/worklife/article/20210528-positive-deviants-why-rebellious-workers-spark-gr-ideas',
      author: 'sonabinu',
      score: '125 points',
      date: '5 hours ago',
      comments: '31 comments',
    },
    {
      rank: '3.',
      title: 'Filtering out newsletter signup forms embedded in web articles',
      url: 'https://www.fivefilters.org/2021/newsletter-signup-forms/',
      author: 'k1m',
      score: '6 points',
      date: '9 minutes ago',
      comments: 'discuss',
    },
  ],
  [
    {
      rank: '4.',
      title: 'Open Source OpenGL ES 3.1 on Mali GPUs with Panfrost',
      url: 'https://www.collabora.com/news-and-blog/blog/2021/06/11/open-source-opengl-es-3.1-on-mali-gpus-with-panfrost/',
      author: 'CameronNemo',
      score: '68 points',
      date: '4 hours ago',
      comments: '12 comments',
    },
    {
      rank: '5.',
      title:
        'Gooey: Turn (almost) any Python command line program into a GUI application',
      url: 'https://github.com/chriskiehl/Gooey',
      author: 'sandebert',
      score: '44 points',
      date: '3 hours ago',
      comments: '13 comments',
    },
    {
      rank: '6.',
      title: 'Ancient Greek accents in ten rules',
      url: 'https://antigonejournal.com/2021/06/greek-accents-ten-rules/',
      author: 'amanuensis',
      score: '55 points',
      date: '4 hours ago',
      comments: '6 comments',
    },
  ],
  [
    {
      rank: '7.',
      title: 'Up for Grabs',
      url: 'https://up-for-grabs.net/',
      author: 'fybs',
      score: '87 points',
      date: '6 hours ago',
      comments: '13 comments',
    },
    {
      rank: '8.',
      title: 'Alternative: A community software search engine',
      url: 'https://alternative-a.com/en/blog/v3release',
      author: 'D2man',
      score: '8 points',
      date: '1 hour ago',
      comments: 'discuss',
    },
    {
      rank: '9.',
      title: 'Tricks of Trench Warfare (2020)',
      url: 'https://gru.gq/2020/02/12/forgotten-tricks-of-trench-warfare/',
      author: 'Tomte',
      score: '49 points',
      date: '4 hours ago',
      comments: '9 comments',
    },
  ],
];

describe('test in cache', () => {
  test('should getCache return default when there is not cache', () => {
    cache.get = jest.fn(() => undefined);
    const { indexCache, infoCache } = getCache(5);

    expect(indexCache).toBe(0);
    expect(infoCache).toEqual([]);
  });

  test('should getCache return data when there is more pages in cache', () => {
    cache.get = jest.fn(() => data);
    const { indexCache, infoCache } = getCache(5);

    expect(indexCache).toBe(3);
    expect(infoCache).toEqual(data);
  });

  test('should getCache return data when there is more cache than pages in cache', () => {
    const correctlyResult = data.slice(0, 2);
    cache.get = jest.fn(() => data);
    const { indexCache, infoCache } = getCache(2);

    expect(indexCache).toBe(3);
    expect(infoCache).toEqual(correctlyResult);
  });
});
