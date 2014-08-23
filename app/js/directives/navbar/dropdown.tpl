<ul class="dropdown-menu dropdown-menu-right" role="menu" style="left:auto">
  <li role="presentation" ng-hide="currentUser" ui-sref-active="disabled">
    <a role="menuitem" tabindex="-1" href="" ui-sref="login">
      log in
    </a>
  </li>
  <li role="presentation" ng-show="currentUser">
    <a role="menuitem" tabindex="-1" href="" ng-click="logout()">
      log out
    </a>
  </li>
</ul>
