import { TSESLint } from '@typescript-eslint/experimental-utils';
import resolveFrom from 'resolve-from';
import rule from '../no-istanbul-ignore-file';

const ruleTester = new TSESLint.RuleTester({
  parser: resolveFrom(require.resolve('eslint'), 'espree'),
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
});

ruleTester.run('no-istanbul-ignore-file', rule, {
  valid: [
    '/* istanbul ignore next */',
    '/* istanbul ignore if */',
    '// istanbul ignore next: with comment',
    '// istanbul ignore function: with comment',
    '// TODO: check istanbul is covering this properly',
    "/* we can't make istanbul ignore file if we're not using istanbul to begin with! */",
    "// ideally we should have istanbul ignore this, but we can't because reasons",
    '#!/usr/bin/env node',
  ],

  invalid: [
    {
      code: '/* istanbul ignore file */',
      errors: [{ messageId: 'istanbulIgnoreFile', column: 1, line: 1 }],
    },
    {
      code: '/* istanbul ignore file: lazy to write tests */',
      errors: [{ messageId: 'istanbulIgnoreFile', column: 1, line: 1 }],
    },
    {
      code: '// istanbul ignore file',
      errors: [{ messageId: 'istanbulIgnoreFile', column: 1, line: 1 }],
    },
    {
      code: '// istanbul ignore file: lazy to write tests',
      errors: [{ messageId: 'istanbulIgnoreFile', column: 1, line: 1 }],
    },
  ],
});
