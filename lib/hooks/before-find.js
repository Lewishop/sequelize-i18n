module.exports = function() {
    
    var self = this;
    
    return function( options ) {
        
        // Get Generated model
        var i18n_model = self.getI18nModel( this.name );
        
        if( options && options.where && i18n_model) {
            for( var prop in options.where ) {
                    
                if( prop in i18n_model.model &&
                    (!self.primary_key || (self.primary_key.hasOwnProperty(prop) && !self.primary_key[prop].primaryKey)) )
                {
                
                    options.include = options.include || []
                    // Look for the model in includes 
                    options.include.forEach( function( incl ) {
                        if( incl.model.name === i18n_model.name ) {
                            incl.where = incl.where || {};
                            incl.where[prop] = options.where[prop];
                        }
                    }, this);
                    
                    delete options.where[prop];
                }                      

                // if( Array.isArray(options.where[prop] ) ) {
                //
                //     console.log('array prop', prop);
                //     console.log('inspecting:', options.where[prop]);
                //
                //     options.include = options.include || []
                //     // Look for the model in includes
                //     options.include.forEach( function( incl ) {
                //
                //         console.log(incl.model.name);
                //         console.log(i18n_model.name);
                //
                //         if( incl.model.name === i18n_model.name ) {
                //             console.log('altering');
                //             incl.where = incl.where || {};
                //             incl.where[prop] = options.where[prop];
                //         }
                //     }, this);
                //
                //     delete options.where[prop];
                // }
            }
        }
        if( options && options.order && i18n_model ) {
            options.order.forEach(function(prop , index) {
                if( prop[0] in i18n_model.model ) {
                    options.order[index] = [{ model : self.sequelize.models[i18n_model.name] , as : i18n_model.name}, prop[0], prop[1]];
                }  
            }, this);
        }
    };
};