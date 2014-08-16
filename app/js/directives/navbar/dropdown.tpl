<ul class="dropdown-menu dropdown-menu-right" role="menu" style="left:auto">
  <li role="presentation" class="dropdown-header">alerts</li>
  <li role="presentation">
    <a role="menuitem" tabindex="-1" href="" ng-click="navbarAlert('warning', something)">
      Warn {{something}}
    </a>
  </li>
  <li role="presentation">
    <a role="menuitem" tabindex="-1" href="" ng-click="navbarAlert('info', something)">
      Info {{something}}
    </a>
  </li>
  <li role="presentation" class="divider"></li>
  <li role="presentation">
    <a role="menuitem" tabindex="-1" ui-sref="contact.modal">
      <i class="glyphicon glyphicon-paperclip"></i>
      Contact/modal
    </a>
  </li>
  <li role="presentation">
    <a role="menuitem" tabindex="-1" href="">
      <i class="glyphicon glyphicon-glass"></i>
      Yay! {{somebody.name}}
    </a>
  </li>
</ul>
