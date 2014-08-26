<div class="navbar-header">
  <button type="button" class="navbar-toggle" ng-click="navbarCollapsed = !navbarCollapsed">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <a class="navbar-brand" href="/">Coopr</a>
</div>
<div class="collapse navbar-collapse" ng-class="{in:navbarCollapsed}">

  <ul class="nav navbar-nav" ng-show="currentUser">
    <li ui-sref-active="active">
      <a ui-sref="clusters">Clusters</a>
    </li>
  </ul>

  <ul class="nav navbar-nav" ng-show="currentUser.hasRole('admin')">
    <li ui-sref-active="active" ng-repeat="(sref, label) in navbarAdminLinks">
      <a ui-sref="{{sref}}">{{label}}</a>
    </li>
  </ul>

  <ul class="nav navbar-nav navbar-right">

    <li class="dropdown">
      <a href="" class="dropdown-toggle">
        <span ng-show="currentUser">Hello {{currentUser.username}}</span>
        <span ng-hide="currentUser">Welcome</span>
        <span class="caret"></span>
      </a>
    </li>

  </ul>
</div>