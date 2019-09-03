import Service, { inject as service } from '@ember/service';
import $ from 'jquery';
import moment from 'moment';


export default Service.extend({
    store: service(),
    showAlert: false,
    showVoucherCard: false,
    voucherRewarded: false,

    closeEditor() {
        // $('.quake-console').slideUp(200);
    },

    openEditor(item) {
        this.set('currentClient', item);
        $('.card').slideDown(300);
    },

    resetVoucherForm() {
        let today = moment().format('YYYY-MM-DD');

        $('#voucher-issue-date').val(today);
        $('#voucher-expiry-date').val(today);
        $('#voucher-amount').val(0);
    },

    createVoucherRecord(data) {
        data.clientId = this.currentClient.id;

        let voucher = this.store.createRecord('voucher', data); // Post request

        voucher.save().then(() => {
            this.set('alertMessage', 'Your voucher has been succesfully created...');
            this.set('alertType', 'success');
            this.set('showAlert', true);
            this.set('showVoucherCard', true)

            let createdVoucher = this.store.query('voucher', data.clientId, $('#voucher-amount').val());
            console.log(createdVoucher);

            createdVoucher.save().then(() => {
                console.log('Voucher GET request');
                this.set('voucherRewarded', true);
                this.set('voucherId', createdVoucher.voucherId )
                console.log(createdVoucher.voucherId);
            })

            setTimeout(() => {
                this.set('showAlert', false);
            }, 3000);
        })
            .catch(() => {
                this.set('alertMessage', 'An error occurred while creating the voucher... Please try again');
                this.set('alertType', 'danger');
                this.set('showAlert', true);

                setTimeout(() => {
                    this.set('showAlert', false);
                }, 3000);
            });
        this.resetVoucherForm();
        this.closeEditor();
    }
});
