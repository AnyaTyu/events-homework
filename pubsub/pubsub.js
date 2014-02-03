function PubSub(){
    this.events = {};
};
/**
 * Функция подписки на событие
 * @param  String eventName     имя события
 * @param  Function handler     функция которая будет вызвана при возникновении события
 * @return Function             ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {
    var funcs = this.events[eventName];
    if (!funcs) {
    funcs = [];   
    } else {
    funcs.push(handler); 
    }
    return handler;
};
/**
 * Функция отписки от события
 * @param  String eventName     имя события
 * @param  Function handler     функция которая будет отписана
 * @return Function             ссылка на handler
 */
PubSub.prototype.unsubscribe = function(eventName, handler) {
    var funcs = this.events[eventName];
    if (funcs) {
    funcs.forEach(function(f, i) {
    if (f === handler) {
    funcs.splice(i,1); 
            }
        });
    }
    return handler;
};
/**
 * Функция генерирующая событие
 * @param  String eventName     имя события
 * @param  Any data             данные для обработки соответствующими функциями
 * @return Boolean              удачен ли результат операции
 */
PubSub.prototype.publish = function(eventName, data) {
    var funcs = this.events[eventName];
    if (funcs) {
    funcs.forEach(function(f) {
    setTimeout(f(data),10);
    return true;
        });
    };                                  
   return false;                                   
};

/*PubSub.prototype.publish = function(eventName, data) {
 -    return false;
 +    if (this.events[eventName] === (undefined || this.events[eventName].length === 0)) {
 +        return false;
 +    } else {
 +        this.events[eventName].forEach(function(handler) {
 +            setTimeout(handler(data), 10);
 +        });
 +        return true;
 +    }
/**
 * Функция отписывающая все функции от определённого события
 * @param  String eventName     имя события
 * @return Boolean              удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {
    var funcs = this.events[eventName];
    if (funcs) {
    funcs.length = 0;       
    }
};
/*
    Примеры использования

    Подписать группу функций на событие 'click':

    PubSub.subscribe('click', function(event, data) { … });
    var second = PubSub.subscribe('click', function(event, data) { … });

    Отписать одну функцию от события 'click':
    PubSub.unsubscribe('click', second);

    Отписать группу функций от события 'click'
    PubSub.off('click');

 */

/*
    Дополнительный вариант: нужно заставить работать методы верно
 */

function foo(event, data) {
  
}

Function.prototype.GlobalPubSub = new PubSub();

Function.prototype.subscribe = globalPubSub.subscribe.bind(globalPubSub);
Function.prototype.unsubscribe = globalPubSub.unsubscribe.bind(globalPubSub);

foo.subscribe('click');

foo.unsubscribe('click');
