var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
/*
import {Device} from 'ionic-native';
*/
/*
  Generated class for the ApiCalls provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var ApiCalls = (function () {
    function ApiCalls(http) {
        this.http = http;
        console.log('Hello ApiCalls Provider');
        this.url = 'https://latreats.com/api/v1/';
        this.auth_token = window.localStorage.getItem('auth_token');
    }
    ApiCalls.prototype.update = function () {
        this.auth_token = window.localStorage.getItem('auth_token');
    };
    ApiCalls.prototype.loggedInCheck = function () {
        if (this.auth_token != null) {
            return true;
        }
        else {
            return false;
        }
    };
    ApiCalls.prototype.load = function () {
        console.log("API CALL");
    };
    ApiCalls.prototype.login = function (email, password) {
        var device_token = window.localStorage.getItem('device_token');
        var url = this.url + 'auth/json?';
        var body = 'email=' + email + '&password=' + password + '&device_token=' + device_token; /* + '&device_type=' + Device.platform;*/
        url += body;
        console.log(url, body);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.register = function (username, email, password, user_type, terms) {
        var url = this.url + 'users/json?';
        var body = 'username=' + username + '&email=' + email + '&password=' + password + '&user_type=' + user_type + '&rules=' + terms;
        url += body;
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.forgotPassword = function (email) {
        var url = this.url + 'auth/remind/json?';
        var body = 'email=' + email;
        url += body;
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.logout = function () {
        var url = this.url + 'auth?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.userProfile = function () {
        var url = this.url + 'me/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    //use only once at create user to create the users contact also
    ApiCalls.prototype.userPersonalContact = function (first_name, last_name) {
        var url = this.url + 'profile/contact/json?';
        var body = 'auth_token=' + this.auth_token + '&first_name=' + first_name + '&last_name=' + last_name;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.findUsers = function (query) {
        var url = this.url + 'users/find-users/json?';
        var body = 'auth_token=' + this.auth_token + '&query=' + query;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.findLinkedUsers = function (query) {
        var url = this.url + 'users/find-linked-users/json?';
        var body = 'auth_token=' + this.auth_token + '&query=' + query;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ////////////////////////////////////
    //      Contact API               //
    ////////////////////////////////////
    ApiCalls.prototype.getContacts = function () {
        var url = this.url + 'contacts/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.createContact = function (first_name, last_name, relationship) {
        var url = this.url + 'contacts/json?';
        var body = 'auth_token=' + this.auth_token + '&first_name=' + first_name + '&last_name=' + last_name + '&relationship=' + relationship;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getContactInfo = function (contact_id) {
        var url = this.url + 'contacts/' + contact_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editContactImage = function (contact_id, name, image) {
        var url = this.url + 'contacts/image/json?';
        var body = 'auth_token=' + this.auth_token + '&contact_id=' + contact_id + '&image=' + image + '&name=' + name;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editContact = function (first_name, last_name, relationship, contact_id) {
        var url = this.url + 'contacts/' + contact_id + '/json?';
        var body = 'auth_token=' + this.auth_token + '&first_name=' + first_name + '&last_name=' + last_name + '&relationship=' + relationship;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteContact = function (contact_id) {
        var url = this.url + 'contacts/' + contact_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    // have to change to accept multiple addresss, phones and emails.
    ApiCalls.prototype.findContact = function (search) {
        var url = this.url + 'users/find-users/json?';
        var body = 'auth_token=' + this.auth_token + '&query=' + search;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.shareContact = function (contact_id, user_id, Taddress, Tphone, Temail) {
        var url = this.url + 'contacts/' + contact_id + '/share/json?';
        var body = 'auth_token=' + this.auth_token + '&user_id=' + user_id + '&info_to_share_addresses=' + Taddress + '&info_to_share_phones=' +
            Tphone + '&info_to_share_emails=' + Temail;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.invite = function (email) {
        var url = this.url + 'invitation/new?';
        var body = 'auth_token=' + this.auth_token + '&email=' + email;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    //contact_id: The id of the contact you want to attach this address. (from URL)
    //Contact Address
    ApiCalls.prototype.createAddress = function (contact_id, street, city, state, country, address_type, zip_code) {
        var url = this.url + 'contacts/' + contact_id + '/addresses/json?';
        var body = 'auth_token=' + this.auth_token + '&street=' + street + '&city=' + city + '&state=' + state + '&country=' +
            country + '&address_type_id=' + address_type + '&zip_code=' + zip_code;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editAddress = function (contact_id, address_id, street, city, state, country, address_type, zip_code) {
        var url = this.url + 'contacts/' + contact_id + '/addresses/' + address_id + '/json?';
        var body = 'auth_token=' + this.auth_token + '&street=' + street + '&city=' + city + '&state=' + state + '&country=' +
            country + '&address_type_id=' + address_type + '&zip_code=' + zip_code;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteAddress = function (contact_id, address_id) {
        var url = this.url + 'contacts/' + contact_id + '/addresses/' + address_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    //Contact Phone string 
    ApiCalls.prototype.createPhone = function (contact_id, pnumber, category, phone_type) {
        var url = this.url + 'contacts/' + contact_id + '/phones/json?';
        var body = 'auth_token=' + this.auth_token + '&number=' + pnumber + '&category=' + category + '&phone_type_id=' + phone_type;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editPhone = function (contact_id, phone_id, pnumber) {
        var url = this.url + 'contacts/' + contact_id + '/phones/' + phone_id + 'json?';
        var body = 'auth_token=' + this.auth_token + '&number=' + pnumber;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deletePhone = function (contact_id, phone_id) {
        var url = this.url + 'contacts/' + contact_id + '/phones/' + phone_id + 'json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    //Contact Email
    ApiCalls.prototype.createEmail = function (contact_id, email, category, email_type) {
        var url = this.url + 'contacts/' + contact_id + '/emails/json?';
        var body = 'auth_token=' + this.auth_token + '&email=' + email + '&category=' + category + '&email_type_id=' + email_type;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editEmail = function (contact_id, email_id, email) {
        var url = this.url + 'contacts/' + contact_id + '/emails/' + email_id + '/json?';
        var body = 'auth_token=' + this.auth_token + '&email=' + email;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteEmail = function (contact_id, email_id) {
        var url = this.url + 'contacts/' + contact_id + '/emails/' + email_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    //Groups
    ApiCalls.prototype.createGroup = function (name) {
        var url = this.url + 'contact-groups/json?';
        var body = 'auth_token=' + this.auth_token + '&name=' + name;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addGroupContact = function (group_id, contact_id) {
        var url = this.url + 'contact-groups/' + group_id + '/contacts/json?';
        var body = 'auth_token=' + this.auth_token + '&contact_id=' + contact_id;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getGroups = function (user_id) {
        var url = this.url + 'contact-groups/' + user_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getGroupContacts = function (group_id) {
        var url = this.url + 'contact-groups/' + group_id + '/contacts/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteGroup = function (group_id) {
        var url = this.url + 'contact-groups/' + group_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteGroupContact = function (group_id, contact_id) {
        var url = this.url + 'contact-groups/' + group_id + '/contacts/' + contact_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    //Organizations
    ApiCalls.prototype.getOrganizationInfo = function (org_id) {
        var url = this.url + 'organizations/' + org_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationContactList = function (org_id) {
        var url = this.url + 'organizations/' + org_id + '/contacts/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationContact = function (org_id, contact_id) {
        var url = this.url + 'organizations/' + org_id + '/contacts/' + contact_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationUserList = function (org_id) {
        var url = this.url + 'organizations/' + org_id + '/users/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationGroupList = function (org_id) {
        var url = this.url + 'organizations/' + org_id + '/groups/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationGroupUserList = function (group_id) {
        var url = this.url + 'organizations/groups/' + group_id + '/users/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationUsersGroupList = function (org_id, user_id) {
        var url = this.url + 'organizations/' + org_id + '/users/' + user_id + '/groups/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationUsersGroupListInverse = function (org_id, user_id) {
        var url = this.url + 'organizations/' + org_id + '/users/' + user_id + '/groups/inverse/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getOrganizationGroupContactList = function (group_id) {
        var url = this.url + 'organizations/groups/' + group_id + '/contacts/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.createOrganization = function (name, city, state, zip, phone, email) {
        var url = this.url + 'organizations/json?';
        var body = 'auth_token=' + this.auth_token + '&name=' + name + '&city=' + city + '&state=' +
            state + '&zip=' + zip + '&phone=' + phone + '&email=' + email;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addOrganizationUser = function (org_id, email) {
        var url = this.url + 'organizations/' + org_id + '/users/json?';
        var body = 'auth_token=' + this.auth_token + '&email=' + email;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addOrganizationGroup = function (org_id, name, note) {
        var url = this.url + 'organizations/' + org_id + '/groups/json?';
        if (note == null)
            var body = 'auth_token=' + this.auth_token + '&name=' + name;
        else
            var body = 'auth_token=' + this.auth_token + '&name=' + name + '&note=' + note;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteOrganizationGroup = function (org_id, group_id) {
        var url = this.url + 'organizations/' + org_id + '/groups/' + group_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addOrganizationContactNew = function (org_id, first_name, last_name, relationship) {
        var url = this.url + 'organizations/' + org_id + '/contacts/new/json?';
        var body = 'auth_token=' + this.auth_token + '&first_name=' + first_name + '&last_name=' + last_name + '&relationship=' + relationship;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addOrganizationContact = function (org_id, contact_id) {
        var url = this.url + 'organizations/' + org_id + '/contacts/json?';
        var body = 'auth_token=' + this.auth_token + '&contact_id=' + contact_id;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addOrganizationContactNote = function (org_id, contact_id, note) {
        var url = this.url + 'organizations/' + org_id + '/notes/json?';
        var body = 'auth_token=' + this.auth_token + '&contact_id=' + contact_id + '&note=' + note;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteOrganizationContact = function (org_id, contact_id) {
        var url = this.url + 'organizations/' + org_id + '/contacts/json?';
        var body = 'auth_token=' + this.auth_token + '&organization_contact_id=' + contact_id;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editOrganization = function (org_id, name, address, city, state, zip, phone, email) {
        var url = this.url + 'organizations/' + org_id + '/users/json?';
        var body = 'auth_token=' + this.auth_token + '&name=' + name + '&address=' + address + '&city=' + city + '&state=' +
            state + '&zip=' + zip + '&phone=' + phone + '&email=' + email;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addOrganizationGroupContact = function (group_id, contact_id) {
        var url = this.url + 'organizations/groups' + group_id + '/contacts/json?';
        var body = 'auth_token=' + this.auth_token + '&organization_contact_id=' + contact_id;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteOrganizationGroupContact = function (group_id, contact_id) {
        var url = this.url + 'organizations/groups' + group_id + '/contacts/' + contact_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addOrganizationGroupUser = function (group_id, user_id) {
        var url = this.url + 'organizations/groups' + group_id + '/users/json?';
        var body = 'auth_token=' + this.auth_token + '&organization_contact_id=' + user_id;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteOrganizationGroupUser = function (group_id, user_id) {
        var url = this.url + 'organizations/groups' + group_id + '/users/' + user_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    //Living Events
    ApiCalls.prototype.getLivingEvents = function (user_id) {
        var url = this.url + 'living-events/users/' + user_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingEventSingle = function (le_id) {
        var url = this.url + 'living-events/' + le_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingEventUsers = function (le_id) {
        var url = this.url + 'living-events/members/' + le_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.createLivingEvent = function (members, title, description, city, state, date, zip, action_id, bs_id, action_message) {
        console.log('bsid', bs_id);
        var url = this.url + 'living-events/json?auth_token=' + this.auth_token;
        var body;
        if (action_message != null) {
            body =
                {
                    members: members,
                    title: title,
                    description: description,
                    city: city,
                    state: state,
                    date: date,
                    preferred_zip_code: zip,
                    action_id: action_id,
                    action_message: action_message,
                };
            if (bs_id != null) {
                body =
                    {
                        members: members,
                        title: title,
                        description: description,
                        city: city,
                        state: state,
                        date: date,
                        preferred_zip_code: zip,
                        action_id: action_id,
                        action_message: action_message,
                        business_service_id: bs_id,
                    };
            }
        }
        if (bs_id != null) {
            body =
                {
                    members: members,
                    title: title,
                    description: description,
                    city: city,
                    state: state,
                    date: date,
                    preferred_zip_code: zip,
                    action_id: action_id,
                    business_service_id: bs_id,
                };
        }
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteLivingEvent = function (le_id) {
        var url = this.url + 'living-events/' + le_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingEventProposals = function (le_id) {
        var url = this.url + 'living-events/' + le_id + '/proposals/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingEventAlbums = function (le_id) {
        var url = this.url + 'living-events/' + le_id + '/albums/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingEventAlbumSingle = function (le_id, album_id) {
        var url = this.url + 'living-events/' + le_id + '/albums/' + album_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addLivingEventAlbum = function (le_id, title, description) {
        var url = this.url + 'living-events/' + le_id + '/albums/json?';
        if (description == null)
            var body = 'auth_token=' + this.auth_token + '&title=' + title;
        else
            var body = 'auth_token=' + this.auth_token + '&title=' + title + '&description=' + description;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addLivingEventAlbumImage = function (le_id, album_id, image, name) {
        var url = this.url + 'living-events/' + le_id + '/albums/' + album_id + '/images/json?';
        var body = 'auth_token=' + this.auth_token;
        var check = {
            image: image,
            name: name
        };
        url += body;
        console.log('url', url);
        return this.http.post(url, check)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteLivingEventAlbumImage = function (le_id, album_id, image_id) {
        var url = this.url + 'living-events/' + le_id + '/albums/' + album_id + '/images/' + image_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editLivingEventAlbum = function (le_id, album_id, title, description, post_permission, visibility, closed) {
        var url = this.url + 'living-events/' + le_id + '/albums/' + album_id + '/json?';
        var body = 'auth_token=' + this.auth_token + '&name=' + title;
        if (description != null)
            body += '&description=' + description;
        if (post_permission != null)
            body += '&post_permission=' + post_permission;
        if (visibility != null)
            body += '&visibility=' + visibility;
        if (closed != null)
            body += '&closed=' + closed;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.deleteLivingEventAlbum = function (le_id, album_id) {
        var url = this.url + 'living-events/' + le_id + '/albums/' + album_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.delete(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingEventTasks = function (le_id) {
        var url = this.url + 'living-events/' + le_id + '/tasks/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addLivingEventTasks = function (le_id, description, assignee) {
        var url = this.url + 'living-events/' + le_id + '/tasks/json?';
        var body = 'auth_token=' + this.auth_token + '&description=' + description + '&assignee=' + assignee;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editLivingEventTasks = function (le_id, task_id, status) {
        var url = this.url + 'living-events/' + le_id + '/tasks/json?';
        var body = 'auth_token=' + this.auth_token + '&task_id=' + task_id + '&status=' + status;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.sendLivingEventTaskReminder = function (le_id, connection_id) {
        var url = this.url + 'living-events/' + le_id + '/remind/' + connection_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    //Messaging (emails)
    ApiCalls.prototype.sendEmail = function (email, subject, body) {
        var url = this.url + 'messages/simple/json?';
        var body = 'auth_token=' + this.auth_token + '&email_to_send=' + email + '&subject=' + subject + '&body=' + body;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.sendGroupEmail = function (group_id, subject, body) {
        var url = this.url + 'messages/contact-group/json?';
        var body = 'auth_token=' + this.auth_token + '&group_id=' + group_id + '&subject=' + subject + '&body=' + body;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    //send_to_option: ENUMERATION: 'contacts'|'users'|'both' (on of those should be the value of this field)
    ApiCalls.prototype.sendOrganizationGroupEmail = function (group_id, subject, body, send_to_option) {
        var url = this.url + '/messages/organization-group/json?';
        var body = 'auth_token=' + this.auth_token + '&group_id=' + group_id + '&subject='
            + subject + '&body=' + body + '&send_to_option=' + send_to_option;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    //Living Conversations
    ApiCalls.prototype.getLivingConversations = function (user_id) {
        var url = this.url + 'living-conversations/users/' + user_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.addLivingConversationUser = function (conversation_id, participants) {
        var url = this.url + 'living-conversations/users/json?';
        var body = 'auth_token=' + this.auth_token + '&conversation_id=' + conversation_id + '&participants=' + participants;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.createLivingConversation = function (subject, preamble, active, group_id, org_group_id) {
        var url = this.url + 'living-conversations/json?';
        var body = 'auth_token=' + this.auth_token + '&subject=' + subject + '&preamble=' + preamble + '&active=' + active +
            '&group_id=' + group_id + '&org_group_id=' + org_group_id;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingConversationMessages = function (conversation_id) {
        var url = this.url + 'living-conversations/messages/' + conversation_id + 'json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.sendMessageLivingConversation = function (conversation_id, message) {
        var url = this.url + 'living-conversations/messages/json?';
        var body = 'auth_token=' + this.auth_token + '&conversation_id=' + conversation_id + '&message=' + message;
        url += body;
        console.log('url', url);
        return this.http.post(url, body)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.getLivingConversationParticipants = function (lc_id) {
        var url = this.url + 'living-conversations/participants/' + lc_id + '/json?';
        var body = 'auth_token=' + this.auth_token;
        url += body;
        console.log('url', url);
        return this.http.get(url)
            .map(function (res) { return res.json(); });
    };
    ApiCalls.prototype.editLivingConversation = function (lc_id, subject, preamble, active) {
        var url = this.url + 'living-conversations/' + lc_id + '/json?';
        var body = 'auth_token=' + this.auth_token + '&subject=' + subject + '&preamble=' + preamble + '&active=' + active;
        url += body;
        console.log('url', url);
        return this.http.put(url, body)
            .map(function (res) { return res.json(); });
    };
    return ApiCalls;
}());
ApiCalls = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], ApiCalls);
export { ApiCalls };
//# sourceMappingURL=api-calls.js.map