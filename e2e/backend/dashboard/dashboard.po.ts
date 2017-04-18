/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { browser, element, by } from 'protractor';
import { BackendPage } from '../backend.po';

export class DashboardPage extends BackendPage {
  navigateTo() {
    return browser.get('/backend');
  }
}