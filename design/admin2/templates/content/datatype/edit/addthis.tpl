{ezscript_require( array( 'text-ext-1.3.1.js', 'addthis.js' ) )}
{default attribute_base='ContentObjectAttribute'
         html_class='full'}
<input type="text" class="add-this-base" size="250"/>

<input type="hidden" class="add-this-final-ids" name="{$attribute_base}_addthis_data_text_{$attribute.id}" value="{$attribute.data_text|wash( xhtml )}"
       id="ezcoa-{if ne( $attribute_base, 'ContentObjectAttribute' )}{$attribute_base}-{/if}{$attribute.contentclassattribute_id}_{$attribute.contentclass_attribute_identifier}" >
{/default}

