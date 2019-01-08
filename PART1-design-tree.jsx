<App>
  <Foo>
    // we can pass mode and roll into a getTheme function, and pass theme into components to determine styling
    <Nav mode role>
      // Role is an enum for role-specific behavior. E.G, search only shows up for admin role
      // mode is an enum for the type of view. E.G, dashboard/workspace/default
      <NavButton onClick selected>
        <Icon hasAlert showBorder size /> // Icon is a general dumb ui component class
          // OR
        <img src /> // sizing handled through css
        <DropdownMenu>
          <DropdownMenuItem showDivider>
          </DropdownMenuItem>
        </DropdownMenu>
      </NavButton>
    </Nav>
    <Main mode role theme> // mode and role determine menu type
      <AdminMenu>
        <DropdownMenu hasDividers={false}>
          <DropdownMenuItem showDivider>
          </DropdownMenuItem>
        </DropdownMenu>
      </AdminMenu>
      <SearchView>
        <DropdownMenu>
          <DropdownMenuItem showDivider>
            <img src /> // to include images, just specify the image as a child
            <span>Oliver Ullman</span>
          </DropdownMenuItem>
        </DropdownMenu>
      </SearchView> // substitute timeline view for chatview/notifications view, ect
    </Main>
  </Foo>
</App>