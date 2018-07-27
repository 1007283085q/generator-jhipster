/** Copyright 2013-2018 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-new, no-unused-expressions */

const path = require('path');
const expect = require('chai').expect;
const JDLLinter = require('../../../lib/linter/jdl_linter');

describe('JDLLinter', () => {
  describe('::new', () => {
    context('when not passing a path', () => {
      it('fails', () => {
        expect(() => {
          new JDLLinter();
        }).to.throw('The JDL file path must be passed.');
      });
    });
    context('when passing invalid args', () => {
      it('fails', () => {
        expect(() => {
          new JDLLinter({});
        }).to.throw('The JDL file path must be passed.');
      });
    });
    context('when passing a folder', () => {
      it('fails', () => {
        expect(() => {
          new JDLLinter({ filePath: '.' });
        }).to.throw('The path to the JDL file doesn\'t exist, got \'.\'.');
      });
    });
  });
  describe('#check', () => {
    context('when checking a for useless entity braces', () => {
      let linter = null;
      let issues = null;

      before(() => {
        linter = new JDLLinter({ filePath: path.join('test', 'test_files', 'lint', 'useless_entity_curly_braces.jdl') });
        issues = linter.check();
      });

      it('reports the issue', () => {
        expect(issues.getEntityIssuesForEntityName('B')).to.have.lengthOf(1);
        expect(issues.getEntityIssuesForEntityName('B')[0].ruleName).to.equal('ENT_SHORTER_DECL');
      });
    });
  });
});
