export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refact',
        'chore',
        'doc',
        'test',
        'style',
        'perf',
        'revert',
      ],
    ],
    'scope-enum': [2, 'always', ['lib', 'test']],
    'scope-empty': [0, 'never'],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
  },
};
