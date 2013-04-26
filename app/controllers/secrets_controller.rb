class SecretsController < ApplicationController

  def index
    @secrets = Secret.all
    render :index

  end

  def create

  end

  def destroy
  end
end
