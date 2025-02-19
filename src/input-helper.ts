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
import * as github from '@actions/github';
import { ICheckerArguments } from './commit-message-checker';

/**
 * Gets the inputs set by the user and the messages of the event.
 *
 * @returns   ICheckerArguments
 */
export function getInputs(): ICheckerArguments {
  const result = ({} as unknown) as ICheckerArguments;

  // Get pattern
  result.pattern = core.getInput('pattern', { required: true });

  // Get flags
  result.flags = core.getInput('flags');

  return result;
}

export function checkArgs(args: any) {
  // Check arguments
  if (args.pattern.length === 0) {
    throw new Error(`PATTERN not defined.`);
  }

  const regex = new RegExp('[^gimsuy]', 'g');
  let invalidChars;
  let chars = '';
  while ((invalidChars = regex.exec(args.flags)) !== null) {
    chars += invalidChars[0];
  }
  if (chars !== '') {
    throw new Error(`FLAGS contains invalid characters "${chars}".`);
  }
}

export function genOutput(info: { sha: any; message: string }) {
  return `  ${info.sha}    ${info.message}`;
}
