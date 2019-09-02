import Component from '@ember/component';


export default Component.extend({
    classNames: ['search-client-wrapper'],

    actions: {
        search() {
            
            let query = {
                email: this.$('#email-search').val(),
                phone: this.$('#phone-search').val()
            };

            this.searchClient(query);
        },

       
    }
});