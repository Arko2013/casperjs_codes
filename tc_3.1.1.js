
/* 
    Author: Arko
    Description:    This is a casperjs automated test script on Shareable link feature of RCloud .On clicking the Shareable Link present
                    on top left corner of the Main page,the view.html page for the currently loaded notebook should open
    
*/

// Begin Tests 




casper.test.begin("tc_3.1.1", 1, function suite(test) {

    casper.start('http://127.0.0.1:8080/login.R', function() {
      	casper.echo('login.R opened');
		casper.wait(8000);
		casper.echo(this.getCurrentUrl());

	
	});
	
	casper.then(function(test) {
	
	siteName=this.getCurrentUrl();
	this.test.assertTitle('RCloud',
        siteName + ' has the correct title');
		casper.echo(siteName);	
	});

		// Shareable link
		
		/*casper.click(x('/html/body/div[2]/div/div[2]/ul/li/span/a/i'),function(){
		this.getCurrentUrl();
		
		});
	*/	
		casper.then(function(test){
    casper.click({type: 'xpath', path: '/html/body/div[2]/div/div[2]/ul/li/span/a/i' },'Clicked');
	this.getCurrentUrl();
	
	});
	
	/*casper.then(function(){
	this.thenClick({type: 'css', path: 'html body div.navbar div div.nav-collapse ul.nav li span a#share-link.btn i.icon-share'});
		this.getCurrentUrl();
		casper.capture('kunaltest.png');
		});*/

    casper.run(function() {
        test.done();
    });
});
