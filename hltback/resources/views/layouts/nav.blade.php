<nav class="navbar navbar-default navbar-static-top">
    <div class="container">
        <div class="navbar-header">

            <!-- Collapsed Hamburger -->
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <!-- Branding Image -->
            <a class="navbar-brand" href="{{ url('/') }}">
                {{ config('app.name', 'Laravel') }}
            </a>

        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <!-- Left Side Of Navbar -->
            <ul class="nav navbar-nav">
              <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Threads
                <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="{{ route('threads.index') }}">All Threads</a></li>
                  @if( Auth::check() )
                  <li><a href="/threads?by={{ Auth::user()->name }}">Threads by Me </a></li>
                  @else
                  <div class="form-group">
                    <input type="text" id="search-name" placeholder="threads by" class="from-control"/>
                  </div>

                  @endif
                  <li>
                    <a href="/threads?popular=1">Popular Threads</a>
                  </li>
                  <li>
                    <a href="/threads?unanswered=1">Unanswered Threads</a>
                  </li>
                </ul>

              </li>

                &nbsp;<li><a href="{{ route('threads.create') }}">New Threads</a></li>
                <li class="dropdown">
                  <a class="dropdown-toggle" data-toggle="dropdown" href="#">Channels
                  <span class="caret"></span></a>
                  <ul class="dropdown-menu">
                    @foreach($channels as $channel)
                     <li>
                       <a href="{{$channel->path()}}">{{$channel->name}}</a>
                     </li>
                    @endforeach
                  </ul>

                </li>
            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="nav navbar-nav navbar-right">
                <!-- Authentication Links -->
                @guest
                    <li><a href="{{ route('login') }}">Login</a></li>
                    <li><a href="{{ route('register') }}">Register</a></li>
                @else

                        <user-notifications></user-notifications>
                    

                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" aria-haspopup="true" v-pre>
                            {{ Auth::user()->name }} <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu">
                            <li>
                              <a href="{{route('profile.show',Auth::User()) }}">My Profile</a>
                            </li>
                            <li>
                                <a href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                    Logout
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                        </ul>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>
