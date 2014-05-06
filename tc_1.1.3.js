/* 
    Author: Ganesh Moorthy
    Description:    This is a casperjs automated test script for Github authentication
                    This is required to bypass github re-direct upon calling login.R
                    in Rcloud. Implementing this as seperate test  / automation scripts to be called
                    as part of other functional tests
    
*/

// Begin Tests 

casper.test.begin("Github Authentication Test Suite", 6, function suite(test) {
    casper.start('http://github.com/login', function() {
        
        test.assertTitleMatch(/Sign in*/, 'Github login Page has the correct title');   
        test.assertTextExists('Username or Email', "Page contails Username or Email text");
        test.assertExists('#login_field', 'Username field exists'); // Check if Username Field exists
        test.assertExists('#password', 'Password field exists'); // Check if Password field exists
    
     
    
    });//start ends
    
    casper.then(function() {
        
        console.log("Login into GitHub with supplied username and password");
        this.sendKeys('#login_field', 'Arko2013');
        this.sendKeys('#password','bazinga50@');
        
        
        
        
    });
    
    casper.then(function() {
        this.click({type: 'css', path: '#login > form > div.auth-form-body > input.button'});
    });
    
    casper.then(function() {
		this.wait(5000);
        test.assertTitleMatch(/GitHub/, "Github page has been loaded");
        test.assertTextExists('Arko2013', 'Arko2013 home page loaded');
    });
    


    casper.run(function() {
        test.done();
    });
    
}); //test.begin ends

// End Tests 
