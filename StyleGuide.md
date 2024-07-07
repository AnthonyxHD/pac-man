>> Als Vorlage wurden die Style Guides von Gitlab und AirBnb verwendet.
>> Bemerkung: Dokument muss fortlaufend ergänzt werden.

>> Quellen:
      >> https://docs.gitlab.com/ee/development/fe_guide/style/javascript.html
      >> https://github.com/airbnb/javascript


<<Referenzen>>

>> Für Referenzen soll const statt var genommen werden.
```javascript
// nicht empfehlenswert
var a = 1;
var b = 2;

// empfehlenswert
const a = 1;
const b = 2;
```

>> Wenn Referenzen neu zugeordnet werden müssen, soll let statt var verwendet werden
```javascript
// nicht empfehlenswert
var count = 1;
if (true) {
  count += 1;
}

// empfehlenswert
let count = 1;
if (true) {
  count += 1;
}
```
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Arrays>>

>> Für die Erstellung von Arrays soll die Literalschreibweise verwendet werden
```javascript
// nicht empfehlenswert
const items = new Array();

// empfehlenswert
const items = [];
```
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Parameter>>

>> Sollte eine Funktion mehr als 3 Parameter haben, soll anstatt einem Parameter, ein Objekt verwendet werden.
```javascript
// keine Empfehlung
function a(d1, d2, d3) {
  // ...
};

// empfehlenswert
function a(d) {
  // ...
};
```
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Strings>>

>> Für Strings sollen einfache Ausführungszeichen verwendet werden.
```javascript
// nicht empfehlenswert
const name = "Capt. Janeway";

// nicht empfehlenswert
const name = `Capt. Janeway`;

// empfehlenswert
const name = 'Capt. Janeway';
```

>> Zeichenketten mit mehr als 100 Zeichen pro Zeile sollen nicht auf mehrere Zeilen aufgeteilt werden.
```javascript
// nicht empfehlenswert
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// nicht empfehlenswert
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// empfehlenswert
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Klassen>>

>> Doppelte Klassenmitglieder sollen vermieden werden.   
```javascript
// nicht empfehlenswert
class Foo {
  bar() { return 1; }
  bar() { return 2; }
}

// empfehlenswert
class Foo {
  bar() { return 1; }
}

// empfehlenswert
class Foo {
  bar() { return 2; }
}
```

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Variablen>>

>> Variablen sollen immer mit const oder let deklariert werden.
```javascript
// nicht empfehlenswert
superPower = new SuperPower();

// empfehlenswert
const superPower = new SuperPower();
```

>> Pro Variable soll eine const- oder let-Deklaration verwendet werden.
```javascript
  // nicht empfehlenswert
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';

// nicht empfehlenswert
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';

// empfehlenswert
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

>> Zeilenumbrüche vor oder nach = sollen vermieden werden.
```javascript
// nicht empfehlenswert
const foo =
  superLongLongLongLongLongLongLongLongFunctionName();

// nicht empfehlenswert
const foo
  = 'superLongLongLongLongLongLongLongLongString';

// empfehlenswert
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
);

// empfehlenswert
const foo = 'superLongLongLongLongLongLongLongLongString';
```

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Blöcke>>

>> Bei mehrzeiligen Blöcken sollen geschweifte Klammern verwendet werden.
```javascript
// nicht empfehlenswert
if (test)
  return false;

// empfehlenswert
if (test) return false;

// empfehlenswert
if (test) {
  return false;
}

// nicht empfehlenswert
function foo() { return false; }

// empfehlenswert
function bar() {
  return false;
}
```

>>  Wenn in einem mehrzeiligen Block if und else verwendet werden, soll das else in dieselbe Zeile wie die schliessende Klammer des if geschrieben werden.
```javascript
// nicht empfehlenswert
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// empfehlenswert
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}

```

>> Blöcke sollen nicht mit Leerzeilen aufgefüllt werden.
```javascript
// nicht empfehlenswert
function bar() {

  console.log(foo);

}

// nicht empfehlenswert
if (baz) {

  console.log(quux);
} else {
  console.log(foo);

}

// nicht empfehlenswert
class Foo {

  constructor(bar) {
    this.bar = bar;
  }
}

// empfehlenswert
function bar() {
  console.log(foo);
}

// empfehlenswert
if (baz) {
  console.log(quux);
} else {
  console.log(foo);
}
```
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Leerzeichen>>

>> Innerhalb der Klammern sollen keine Leerzeichen eingefügt werden.
```javascript
// nicht empfehlenswert
function bar( foo ) {
  return foo;
}

// empfehlenswert
function bar(foo) {
  return foo;
}

// nicht empfehlenswert
if ( foo ) {
  console.log(foo);
}

// empfehlenswert
if (foo) {
  console.log(foo);
}
```


>> Innerhalb eckigen Klammern sollen keine Leerzeichen eingefügt werden.
```javascript
// nicht empfehlenswert
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);

// empfehlenswert
const foo = [1, 2, 3];
console.log(foo[0]);
```

>> Innerhalb geschweiften Klammern sollen Leerzeichen eingefügt werden.
```javascript
// nicht empfehlenswert
const foo = {clark: 'kent'};

// empfehlenswert
const foo = { clark: 'kent' };
```

>> Vor dem Komma soll auf das Leerzeichen verzichtet werden. Nach dem Komma soll ein Leerzeichen eingefügt werden.
```javascript
// nicht empfehlenswert
var foo = 1,bar = 2;
var arr = [1 , 2];

// empfehlenswert
var foo = 1, bar = 2;
var arr = [1, 2];
```

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

<<Namenskonventionen>>

>> Namen sollen mehr als einen Buchstaben haben und beschreibend sein.
```javascript
// nicht empfehlenswert
function q() {
  // ...
}

// empfehlenswert
function query() {
  // ...
}
```

>> Für die Benennung von Objekten, Funktionen und Instanzen soll der camelCase verwendet werden.
```javascript
// nicht empfehlenswert
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// empfehlenswert
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

>> Für die Benennung von Konstruktoren oder Klassen soll der PascalCase verwendet werden.
```javascript
// nicht empfehlenswert
function user(options) {
  this.name = options.name;
}

const bad = new user({
  name: 'nope',
});

// empfehlenswert
class User {
  constructor(options) {
    this.name = options.name;
  }
}

const good = new User({
  name: 'yup',
});
```


>> Führende und nachgestellte Unterstriche sollten vermieden werden.
```javascript
// nicht empfehlenswert
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';

// empfehlenswert
this.firstName = 'Panda';

```

>> Akronyme und Initialen sollten immer in Gross- oder Kleinbuchstaben geschrieben werden.
```javascript
// nicht empfehlenswert
import SmsContainer from './containers/SmsContainer';

// nicht empfehlenswert
const HttpRequests = [
  // ...
];

// empfehlenswert
import SMSContainer from './containers/SMSContainer';

// empfehlenswert
const HTTPRequests = [
  // ...
];

// auch empfehlenswert
const httpRequests = [
  // ...
];

// empfehlenswert
import TextMessageContainer from './containers/TextMessageContainer';

// empfehlenswert
const requests = [
  // ...
];
```






