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
    }
    if (handler !== underfined) {
        if (funcs.indexOf(handler) == -1) {
            funcs.push(handler);
        };
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
         funcs.forEach(function(f) {
            setTimeout(function() { f(data) }, 10);
            return true;
         });
    };                                  
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
Function.prototype.subscribe = Function.prototype.GlobalPubSub.prototype.subscribe.bind(Function.prototype.GlobalPubSub);
Function.prototype.unsubscribe = Function.prototype.GlobalPubSub.prototype.unsubscribe.bind(Function.prototype.GlobalPubSub));

foo.subscribe('click');
foo.unsubscribe('click');
