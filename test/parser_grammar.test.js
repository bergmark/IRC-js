var Parser = require('parser_grammar' );

var validRaws = [
  'PING :lindbohm.freenode.net',
  'NOTICE AUTH :*** Processing connection to irc.server',
  'NOTICE AUTH :*** Looking up your hostname...',
  'NOTICE AUTH :*** Checking Ident',
  'NOTICE AUTH :*** No Ident response',
  'NOTICE AUTH :*** Found your hostname',
  ':irc.server 001 nick :Welcome to the Sample IRC Network nick',
  ':irc.server 002 nick :Your host is irc.server[irc.server/6667], running version sample-ircd-1.0',
  ':irc.server 003 nick :This server was created fri oct 22 2010 at 08:10:00 CEST',
  ':irc.server 004 nick irc.server sample-ircd-1.0 oiwszcerkfydnxbauglZCD biklmnopstveI bkloveI',
  ':irc.server 005 nick CHANTYPES=&# EXCEPTS INVEX CHANMODES=eIb,k,l,imnpst CHANLIMIT=&#:15 PREFIX=(ov)@+ MAXLIST=beI:25 NETWORK=RINet MODES=4 STATUSMSG=@+ KNOCK CALLERID=g :are supported by this server',
  ':irc.server 005 nick SAFELIST ELIST=U CASEMAPPING=rfc1459 CHARSET=ascii NICKLEN=9 CHANNELLEN=50 TOPICLEN=160 ETRACE CPRIVMSG CNOTICE DEAF=D MONITOR=100 :are supported by this server',
  ':irc.server 005 nick TARGMAX=NAMES:1,LIST:1,KICK:1,WHOIS:1,PRIVMSG:4,NOTICE:4,ACCEPT:,MONITOR: :are supported by this server',
  ':irc.server 251 nick :There are 8 users and 14 invisible on 2 servers',
  ':irc.server 252 nick 2 :IRC Operators online',
  ':irc.server 254 nick 6 :channels formed',
  ':irc.server 255 nick :I have 5 clients and 1 servers',
  ':irc.server 265 nick 5 11 :Current local users 5, max 11',
  ':irc.server 266 nick 22 31 :Current global users 22, max 31',
  ':irc.server 250 nick :Highest connection count: 12 (11 clients) (2589 connections received)',
  ':irc.server 375 nick :- irc.server Message of the Day - ',
  ':irc.server 372 nick :- This is sample-ircd MOTD you might replace it, but if not your friends will',
  ':irc.server 372 nick :- laugh at you.',
  ':irc.server 376 nick :End of /MOTD command.',
  ':nick!~user@host JOIN :#chan',
  ':irc.server 353 nick = #chan :nick someone',
  ':irc.server 366 nick #chan :End of /NAMES list.',
  ':someone!user@host PRIVMSG #chan :bad bot',
  ':nick`!u@h JOIN :#chan',
  ':nick JOIN :#chan'
];


module.exports = {
  backtick : function (assert) {
    for (var i = 0; i < validRaws.length; i++) {
      assert.ok( Parser.parse(validRaws[i] + '\r\n' ) !== null, "Parse failed for raw: " + validRaws[i] );
    }

    // Shall parse persons as Person, not Server.
    var res = Parser.parse( ':nick`!user@host JOIN :#chan\r\n' );
    assert.eql( 'person', res.children[0].type );
    res = Parser.parse( ':nick` JOIN :#chan\r\n' );
    assert.eql( 'person', res.children[0].type );
    res = Parser.parse( ':irc.server 353 nick = #chan :nick someone\r\n' );
    assert.eql( 'servername', res.children[0].type );
  }
};
