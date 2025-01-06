
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/Users/varsana/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/varsana/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/varsana/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/varsana/opt/anaconda3/bin:$PATH"
    	
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

# Add Yarn to PATH
export PATH="/Users/varsana/flutter/bin:$PATH"
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
export PATH="$PATH:/usr/local/bin/yarn"
export JAVA_HOME=$(/usr/libexec/java_home -v 22)
export PATH=$JAVA_HOME/bin:$PATH	
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

ulimit -n 2048
