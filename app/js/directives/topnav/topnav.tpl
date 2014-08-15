<div class="navbar-header">
  <button type="button" class="navbar-toggle" ng-click="navbarCollapsed = !navbarCollapsed">
    <span class="sr-only">Toggle navigation</span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <a class="navbar-brand" href="#">Adze</a>
</div>
<div class="collapse navbar-collapse" ng-class="{in:navbarCollapsed}" bs-header>
  <ul class="nav navbar-nav">

    <li><a href="#/" data-match-route="/">Home</a></li>
    <li><a href="#/about" data-match-route="/about.*">About</a></li>
    <li><a href="#/contact" data-match-route="/contact">Contact</a></li>

    <li class="dropdown">
      <a href="" class="dropdown-toggle">Dropdown <span class="caret"></span></a>
    </li>

  </ul>
</div>