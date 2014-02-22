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
    this.events[eventName] = this.events[eventName] || [];
    var funcs = this.events[eventName];
    if (handler && (funcs.indexOf(handler) == -1)) {
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
    var funcs = this.events[eventName],
        index;
    if (funcs) {
         index = funcs.indexOf(handler); 
            if (index !== -1) {
                funcs.splice(index, 1); 
            }
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
         funcs.forEach(function() {
            setTimeout(function() { f(data, eventName) }, 0);
         });
    }                                  
   return false;                                   
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  String eventName     имя события
 * @return Boolean              удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {
    var funcs = this.events[eventName];
    if (funcs) {
        this.events[eventName] = undefined;
        return true;
    }
    return false;
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

Function.prototype.subscribe = function() {
     this.subscribe.apply(Function.prototype.GlobalPubSub, arguments);
}
Function.prototype.unsubscribe = function() {
    this.unsubscribe.apply(Function.prototype.GlobalPubSub, arguments);
}

foo.subscribe('click');
foo.unsubscribe('click');