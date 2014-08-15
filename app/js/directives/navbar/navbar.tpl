<div class="navbar-header">
  <button type="button" class="navbar-toggle" ng-click="navbarCollapsed = !navbarCollapsed">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <a class="navbar-brand" href="/">Adze</a>
</div>
<div class="collapse navbar-collapse" ng-class="{in:navbarCollapsed}">
  <ul class="nav navbar-nav">

    <li ui-sref-active="active"><a ui-sref="home">Home</a></li>
    <li ui-sref-active="active"><a ui-sref="about">About</a></li>
    <li ui-sref-active="active"><a ui-sref="contact">Contact</a></li>

  </ul>
  <ul class="nav navbar-nav navbar-right">

    <li class="dropdown">
      <a href="" class="dropdown-toggle">
        <span class="caret"></span> Dropdown
      </a>
    </li>

  </ul>
</div>