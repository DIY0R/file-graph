export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
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
    'header-max-length': [2, 'always', 70],
    'body-max-line-length': [0, 'never'],
    'body-leading-blank': [0, 'never'],
    'subject-case': [2, 'never', ['start-case', 'pascal-case', 'upper-case']],
  },
};
