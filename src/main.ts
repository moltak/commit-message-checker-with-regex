/*
 * This file is part of the "GS Commit Message Checker" Action for Github.
 *
 * Copyright (C) 2019 by Gilbertsoft LLC (gilbertsoft.org)
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * For the full license information, please read the LICENSE file that
 * was distributed with this source code.
 */

/**
 * Imports
 */
import * as core from '@actions/core';
import * as inputHelper from './input-helper';
import * as commitMessageChecker from './commit-message-checker';

/**
 * Main function
 */
async function run(): Promise<number> {
  try {
    const commitsString = core.getInput('commits');
    const commits = JSON.parse(commitsString);
    const checkerArguments = inputHelper.getInputs();

    for (const { commit, sha } of commits) {
      inputHelper.checkArgs(checkerArguments);
      const foundCommitMessage = commitMessageChecker.checkCommitMessages(
        checkerArguments,
        commit.message,
      );

      if (foundCommitMessage) {
        const summary = inputHelper.genOutput({
          sha,
          message: foundCommitMessage,
        });
        core.setOutput('RESULT', 'NEED_REACTION');
        core.info(summary);
        await makeReaction();
        return 0;
      }
    }

    core.setOutput('RESULT', 'NEED_REACTION');
    return 0;
  } catch (error) {
    // @ts-ignore
    core.info(error);
    // @ts-ignore
    core.error(error);
    // @ts-ignore
    core.setFailed(error.message);
    return -1;
  }
}

async function makeReaction() {
  console.log('makeReaction');
}

/**
 * Main entry point
 */
run();
