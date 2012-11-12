/**
 * Script plugs the TextExp plugin into AddThis field
 */

$(document).ready(function(){
    
    // JSONP feed
    var addthis_feed = 'http://cache.addthiscdn.com/services/v1/sharing.en.jsonp';
    
    // Services object
    var Services = {
        
        // variable storing all data comming from AddThis
        data: new Object(),
        // setter method for data object
        setData: function(data) {
            this.data = data;          
        },
        // method returns an array of all values (names)
        getAllValues: function() {
            var values = [];
            for (var i in this.data){
                values.push(this.data[i].name);
            }
            return values;
        },
        // method returns keys which are adequate to the values from given array
        getKeys: function(values) {
            var keys = [];
            if (!(values instanceof Array)){
                values = values.split(',');
            }
            for (var i=0; i<values.length; i++) {
                for (var j in this.data) {
                    if (this.data[j].name == values[i]) {
                        keys.push(this.data[j].code);
                    }
                }
            }           
            return keys;
        },
        // method returns values (names) which are adequate to the keys from given array
        getValues: function(keys) {
            keys = keys.split(',');
            var values = [];
            for (var i=0; i<keys.length; i++) {
                for (var j in this.data) {
                    if (this.data[j].code == keys[i]) {
                        values.push(this.data[j].name);
                    }
                }                
            }
            return values;
        }
    };  
    
    // fetching the data from AddThis
    $.ajax({
        url: addthis_feed,
        dataType: 'jsonp',
        jsonp:'jsonpcallback', 
        cacheResults: true,
        success:  function(json_content){
            
            // updating services IDs after changing them
            $('.add-this-base').live('blur',function(){
                var values = $.parseJSON($('.add-this-content-item').val());
                var keys = Services.getKeys(values);
                
                $(this).parents('.ezcca-edit-add_this').find('.add-this-final-ids').val(keys);
            });       
    
            // setting up the data in the object
            Services.setData(json_content.data);
    
            $('.add-this-base').each(function(){
                var input = $(this);
                var all_values = Services.getAllValues();
                $(this).textext({
                    plugins : 'tags autocomplete suggestions filter',
                    suggestions: all_values,
                    tagsItems: Services.getValues(input.parents('.ezcca-edit-add_this').find('.add-this-final-ids').val()),
                    filterItems: all_values,
                    html: {
                        hidden: '<input type="hidden" class="add-this-content-item"/>'
                    }        
                });
            })                
        }
    });
});